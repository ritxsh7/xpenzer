import { StatusCodes } from "http-status-codes";
import db from "../../config/database.js";
import { date } from "../../utils/constants.js";
import { validationResult } from "express-validator";

export const createNewUnregisteredFriend = async (req, res) => {
  // VALIDATION
  const errors = validationResult(req);
  const errorMessages = errors.array().map((err) => err.msg);
  //   console.log(errorMessages);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errorMessages,
    });
  }

  const CHECK_IS_FRIEND =
    "SELECT * FROM FRIENDS F JOIN EXP_USER U ON F.FRIEND_ID = U.USER_ID WHERE F.USER_ID = $1 AND LOWER(U.USERNAME) = LOWER($2)";

  const CREATE_UNREGISTERED_FRIEND =
    "INSERT INTO FRIENDS(USER_ID, FRIEND_ID, CREATED_ON) VALUES ($1, $2, $3) RETURNING *";

  const CREATE_UNREGISTERED_USER =
    "INSERT INTO EXP_USER(USERNAME) VALUES ($1) RETURNING *";

  const { userId } = req;
  const { firstName, lastName } = req.body;

  const friendName = `${firstName} ${lastName}`;

  let newFriend, newFriendResult, newUser, newUserResult;

  try {
    // CHECK IF THE FRIEND ALREADY EXISTS
    const checkFriend = await db.query(CHECK_IS_FRIEND, [userId, friendName]);
    if (checkFriend.rowCount) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Friend with the name " + friendName + " already exists",
      });
    }

    // CREATE AN UNREGISTERED USER
    newUserResult = await db.query(CREATE_UNREGISTERED_USER, [
      firstName + " " + lastName,
    ]);
    newUser = newUserResult.rows[0];

    // THEN MAKE HIM FRIEND FOR USER
    newFriendResult = await db.query(CREATE_UNREGISTERED_FRIEND, [
      userId,
      newUser.user_id,
      new Date().toLocaleDateString("en-IN", date.options),
    ]);
    newFriend = newFriendResult.rows[0];

    return res.status(StatusCodes.CREATED).json({
      message: "Added friend to friend list",
      data: { newFriend, newUser },
    });
  } catch (error) {
    console.log("Error while creating new friend: " + error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while adding friend",
    });
  }
};

export const createNewRegisteredFriend = async (req, res) => {
  //VALIDATION
  const errors = validationResult(req);
  const errorMessages = errors.array().map((err) => err.msg);

  if (errorMessages.length) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: errorMessages,
    });
  }

  const { friendId } = req.body;
  const { userId } = req;

  const CHECK_IS_FRIEND =
    "SELECT * FROM FRIENDS WHERE USER_ID = $1 AND FRIEND_ID = $2";

  const CREATE_NEW_FRIEND =
    "INSERT INTO FRIENDS(USER_ID, FRIEND_ID, CREATED_ON) VALUES ($1, $2, $3) RETURNING *";

  try {
    // CHECK IF FRIEND ALREADY EXISTS
    const checkFriendResult = await db.query(CHECK_IS_FRIEND, [
      userId,
      friendId,
    ]);
    if (checkFriendResult.rowCount) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Friend already exists",
      });
    }

    const newFriendResult = await db.query(CREATE_NEW_FRIEND, [
      userId,
      friendId,
      new Date().toLocaleDateString("en-IN", date.options),
    ]);

    const newFriend = newFriendResult.rows[0];

    return res.status(StatusCodes.CREATED).json({
      message: "Friend added to friend list",
      data: newFriend,
    });
  } catch (err) {
    console.log("Error while adding a registered friend " + err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while adding friend",
    });
  }
};

export const updateBalance = async (value, userId, friendId) => {
  console.log(userId);

  const SIMPLE_UPDATE_USER_BALANCE =
    "UPDATE FRIENDS SET BALANCE = BALANCE + $1 WHERE USER_ID = $2 AND FRIEND_ID = $3";

  const UPDATE_FRIEND_BALANCE =
    "UPDATE FRIENDS SET BALANCE = $1 WHERE USER_ID = $2 AND FRIEND_ID = $3";

  const UPDATE_USER_BALANCE =
    "UPDATE FRIENDS SET BALANCE = $1 WHERE USER_ID = $2 AND FRIEND_ID = $3";

  const CLEAR_FRIEND_BALANCE =
    "UPDATE FRIENDS SET BALANCE = 0 WHERE USER_ID = $1 AND FRIEND_ID  = $2";

  const GET_FRIEND_BALANCE =
    "SELECT BALANCE FROM FRIENDS WHERE USER_ID = $1 AND FRIEND_ID = $2";

  let updatedBalanceResult;
  try {
    const getFriendBalanceResult = await db.query(GET_FRIEND_BALANCE, [
      friendId,
      userId,
    ]);

    if (!getFriendBalanceResult.rowCount) {
      updatedBalanceResult = await db.query(SIMPLE_UPDATE_USER_BALANCE, [
        value,
        userId,
        friendId,
      ]);
      return "Friend balance updated";
    }

    const friendBalance = getFriendBalanceResult.rows[0].balance;
    console.log("Friend balance = ", friendBalance);
    console.log("Value = ", value);

    let balanceClearedResult;
    if (Number(value) >= Number(friendBalance)) {
      updatedBalanceResult = await db.query(UPDATE_USER_BALANCE, [
        value - friendBalance,
        userId,
        friendId,
      ]);
      balanceClearedResult = await db.query(CLEAR_FRIEND_BALANCE, [
        friendId,
        userId,
      ]);
      console.log(balanceClearedResult.rows);
    } else {
      updatedBalanceResult = await db.query(UPDATE_FRIEND_BALANCE, [
        friendBalance - value,
        friendId,
        userId,
      ]);
    }
    if (updatedBalanceResult.rowCount) return "Balance updated sucessfully";
    return "No such friend exists";
  } catch (error) {
    console.log("Error while updating balance:" + error);
    return error;
  }
};
