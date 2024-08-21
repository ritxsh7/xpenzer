import db from "../config/database.js";

class Friends {
  createUnregisteredFriend = async (userId, friendId) => {
    // CREATE UNREGISTERED FRIEND
    const CREATE_UNREGISTERED_FRIEND =
      "INSERT INTO friends(user_id, friend_id) VALUES ($1, $2)";

    const { result, error } = await db.query(CREATE_UNREGISTERED_FRIEND, [
      userId,
      friendId,
    ]);

    if (result) return result.rows[0];
    throw error;
  };

  getAllFriends = async (userId) => {
    const GET_ALL_FRIENDS = "SELECT * FROM user_friends WHERE user_id = $1";

    const { result, error } = await db.query(GET_ALL_FRIENDS, [userId]);

    if (result) return result.rows;
    throw error;
  };
}

export default new Friends();
