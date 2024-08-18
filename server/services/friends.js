import db from "../config/database.js";

class Friends {
  createUnregisteredFriend = async (userId, friendId) => {
    // CREATE UNREGISTERED FRIEND
    const CREATE_UNREGISTERED_FRIEND =
      "INSERT INTO unregistered_users(username) VALUES ($1) RETURNING username";

    const { result, error } = await db.query(CREATE_USER, [username]);

    if (result) return result.rows[0];
    throw error;
  };
}
