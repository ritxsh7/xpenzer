import response from "../../helpers/response.js";
import contributions from "../../services/contributions.js";
import expenses from "../../services/expenses.js";
import spendings from "../../services/spendings.js";

export const getAllSpendings = async (req, res) => {
  try {
    const resultList = await spendings.getAllSpendings(req.user.userId, true);
    return response.ok(res, resultList, "Fetched all spendings");
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const createNewSpending = async (req, res) => {
  const { amount, description, contributors, date, isUserPresent, userAmount } =
    req.body;
  try {
    // NO CONTRIBUTORS => ADD AS PERSONAL EXPENSE
    if (!contributors) {
      const newExpense = await expenses.createNewExpense(
        req.user.userId,
        amount,
        description,
        date
      );
      return response.ok(res, newExpense);
    }

    // CREATE A SPENDING
    const newSpending = await spendings.createNewSpending(
      req.user.userId,
      amount,
      description,
      date
    );

    // CREATE ALL CONTRIBUTORS
    const newContributions =
      contributors.registered?.length > 0 &&
      (await contributions.createManyContributions(
        newSpending.spending_id,
        contributors.registered
      ));

    // CREATE ALL UNREGISTERED CONTRIBUTORS
    const newUnregisteredContributors =
      contributors.unregistered?.length > 0 &&
      (await contributions.createUnregisteredContribution(
        contributors.unregistered,
        newSpending.spending_id,
        req.user.userId
      ));

    //IF USER IS PRESENT THEN ADD PERSONAL EXPENSE
    const userExpense =
      isUserPresent &&
      (await expenses.createNewExpense(
        req.user.userId,
        userAmount,
        description,
        date
      ));

    const result = await Promise.all([
      newContributions,
      newUnregisteredContributors,
    ]);

    return response.ok(res, {
      newSpending,
      newContributions: result[0],
      newUnregisteredContributors: result[1],
      userExpense,
    });
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};
