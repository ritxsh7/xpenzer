import { StatusCodes } from "http-status-codes";
import db from "../../config/database.js";
import { date, time } from "../../utils/constants.js";
import { addNewContributer } from "../contributors/contributors.js";
import { addNewExpense } from "../expenses/expenses.js";
import {
  createNewUnregisteredFriendHelper,
  updateBalance,
} from "../friends/friends.js";

export const getAllSpendings = async (req, res) => {
  const GET_ALL_SPENDINGS = "SELECT * FROM USER_SPENDINGS WHERE USER_ID = $1";

  try {
    //FETCH ALL FROM THE DATABASE
    const spendings = await db.query(GET_ALL_SPENDINGS, [req.user.userId]);

    //RESPONSE
    return res.status(200).json({
      message: "Data fetched",
      data: spendings.rows,
    });
  } catch (error) {
    console.log("Can't fetch all spendings " + error);
    return res.status(500).json({
      message: "Can't fetch expenses",
    });
  }
};

export const createNewSpending = async (req, res) => {
  const CREATE_SPENDING =
    "INSERT INTO USER_SPENDINGS(USER_ID, TOTAL_EXP, IS_SHARED_EXPENSE, SPENDING_DATE, SPENDING_TIME, DESCRIPTION) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

  const {
    contributors,
    amount,
    userAmount,
    isSplitEqually,
    isUserPresent,
    isSharedExpense,
    description,
  } = req.body;

  const { userId } = req.user;

  let newExpense,
    contri,
    newContributors = [],
    newContributor;

  try {
    // INSERT INTO SPENDINGS
    const resultNewSpending = await db.query(CREATE_SPENDING, [
      userId,
      amount,
      isSharedExpense,
      new Date().toLocaleDateString("en-IN", date.options),
      new Date().toLocaleTimeString("en-IN", time.options),
      description,
    ]);

    const newSpending = resultNewSpending.rows[0];

    // IF EXPENSE IS SHARED BETWEEN USERS
    if (isSharedExpense) {
      if (isSplitEqually) {
        //TOTAL NUMBER OF CONTRIBUTORS
        const totalContributers = isUserPresent
          ? contributors.length + 1
          : contributors.length;

        contri = amount / totalContributers;

        if (isUserPresent) {
          newExpense = await addNewExpense({
            spendingId: newSpending.spending_id,
            amount: contri,
          });
        }
      } else {
        newExpense = await addNewExpense({
          spendingId: newSpending.spending_id,
          amount: userAmount,
        });
      }
      // ADD EACH CONTRIBUTOR IN THE CONTRIBUTOR TABLE
      for (let contributor of contributors) {
        if (!contributor.isRegistered) {
          try {
            const { data } = await createNewUnregisteredFriendHelper(
              userId,
              contributor.name
            );
            contributor.userId = data.newUser.user_id;
          } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              message: error.message,
            });
          }
        }

        newContributor = await addNewContributer({
          spendingId: newSpending.spending_id,
          userId: contributor.userId,
          amount: isSplitEqually ? contri : contributor.amount,
        });

        // ADD TO CONTRIBUTORS LIST
        newContributors.push(newContributor.result);

        // UPDATE BALANCE IF IN FRIEND LIST
        const checkUpdated = await updateBalance(
          newContributor.result.amount,
          userId,
          newContributor.result.user_id
        );
        console.log(checkUpdated);
      }
    } else {
      newExpense = await addNewExpense({
        spendingId: newSpending.spending_id,
        amount,
      });
    }

    return res.status(StatusCodes.CREATED).json({
      message: "Added new expense",
      data: {
        spending: newSpending,
        contributors: newContributors,
        expense: newExpense?.result,
      },
    });
  } catch (error) {
    console.log("Error while creating new spending " + error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while adding an spending : ",
    });
  }
};
