import friends from "../../services/friends.js";
import response from "../../helpers/response.js";

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
  // console.log(req.user.userId, req.query.fid);
  try {
    const [friendContris, userContris] = await friends.getContributions(
      req.user.userId,
      req.query.fid
    );

    let aggregatedResult = [];

    friendContris?.byuser.map((contri) =>
      aggregatedResult.push({ ...contri, byFriend: true })
    );

    userContris?.byuser.map((contri) =>
      aggregatedResult.push({ ...contri, byFriend: false })
    );

    aggregatedResult.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    );

    return response.ok(
      res,
      {
        lendings: friendContris?.sum,
        borrowings: userContris?.sum,
        transactions: aggregatedResult,
      },
      "Contributions fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};
