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

  getFriendsLike = async (userId, name) => {
    const GET_FRIENDS_LIKE =
      "SELECT * FROM user_friends WHERE user_id = $1 AND LOWER(friend_name) like LOWER($2)";

    const searchName = `%${name}%`;

    const { result, error } = await db.query(GET_FRIENDS_LIKE, [
      userId,
      searchName,
    ]);

    if (result) return result.rows;
    throw error;
  };

  getUsersLike = async (phone) => {
    const GET_FRIENDS_LIKE = "SELECT * FROM users WHERE phone LIKE $1";

    const { result, error } = await db.query(GET_FRIENDS_LIKE, [`%${phone}%`]);

    if (result) return result.rows;
    throw error;
  };
}

export default new Friends();
