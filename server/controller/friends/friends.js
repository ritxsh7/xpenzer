import friends from "../../services/friends.js";
import response from "../../helpers/response.js";
import notifications from "../../services/notifications.js";

export const getAllFriends = async (req, res) => {
  try {
    const result = await friends.getAllFriends(req.user.userId);
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const getFriendsLike = async (req, res) => {
  try {
    const result = await friends.getFriendsLike(
      req.user.userId,
      req.query.like
    );
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const getUsersLike = async (req, res) => {
  try {
    const result = await friends.getUsersLike(req.query.like);
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const addFriend = async (req, res) => {
  // console.log(req.user.userId, req.query.fid);
  try {
    const result = await friends.addFriend(req.user.userId, req.query.fid);
    return response.ok(res, result, "Friend added successfully");
  } catch (error) {
    console.log(error);
    let message = error.code === "23505" ? "Friend already exists" : "";
    return response.serverError(res, message);
  }
};

export const getMutualContributions = async (req, res) => {
  // console.log(req.query.start, req.query.end);

  try {
    const { friendContributions, userContributions } =
      await friends.getContributions(
        req.user.userId,
        req.query.fid,
        req.query.start,
        req.query.end
      );

    // return response.ok(res, { friendContributions, userContributions });

    let aggregatedResult = [];

    friendContributions?.map((contri) =>
      aggregatedResult.push({ ...contri, byFriend: true })
    );

    userContributions?.map((contri) =>
      aggregatedResult.push({ ...contri, byFriend: false })
    );

    return response.ok(
      res,
      {
        transactions: aggregatedResult,
      },
      "Contributions fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const settleBalance = async (req, res) => {
  const { fid } = req.body;

  try {
    const result = await friends.settleBalance(req.user.userId, fid);
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const settleTransction = async (req, res) => {
  const { fid, contriId, amount } = req.body;

  // console.log(fid, contriId,  parseInt(amount));

  try {
    const result = await friends.settleTransactions(
      req.user.userId,
      fid,
      contriId,
      amount
    );
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const sendFriendRequest = async (req, res) => {
  const { user } = req;
  const { id } = req.body;

  try {
    const request = await notifications.sendFriendRequest(user, id);
    response.ok(
      res,
      request,
      "Friend request has been sent to the user of this account"
    );
  } catch (error) {
    console.log(error);
    response.serverError(res);
  }
};

export const acceptFriendRequest = async (req, res) => {
  const { friendId } = req.query;

  try {
    const result = await friends.acceptFriendRequest(req.user.userId, friendId);
    return response.ok(res, result, "Friend requested accepted");
  } catch (error) {
    console.log(error);
    response.serverError(res);
  }
};
