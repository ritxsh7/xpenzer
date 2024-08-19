import db from "../config/database.js";
import friends from "./friends.js";

class UserService {
  // CREATE USER
  createUser = async (username, phone, password) => {
    const CREATE_USER =
      "INSERT INTO users(username, phone, password) VALUES ($1, $2, $3) RETURNING username, password, phone";

    const { result, error } = await db.query(CREATE_USER, [
      username,
      phone,
      password,
    ]);
    if (result) return result.rows[0];
    throw error;
  };

  // FIND USER
  findUser = async (phone) => {
    //SQL QUERIES
    const FIND_USER = "SELECT * FROM  users WHERE phone = $1";

    const { result, error } = await db.query(FIND_USER, [phone]);
    if (result) return result.rows[0];
    throw error;
  };

  // CREATE UNREGISTERED USER
  createUnregisteredUser = async (user, currUserId) => {
    const CREATE_UNREGISTERED_USER =
      "INSERT INTO users(username, is_registered) VALUES ($1, $2) RETURNING user_id, username, phone";

    const { result, error } = await db.query(CREATE_UNREGISTERED_USER, [
      user.username,
      false,
    ]);

    if (result) {
      await friends.createUnregisteredFriend(
        currUserId,
        result.rows[0].user_id
      );
      return result.rows[0];
    }
    throw error;
  };

  createManyUnregisteredUser = async (users, currUserId) => {
    let newUsers = [];
    for (const user of users) {
      const result = await this.createUnregisteredUser(user, currUserId);
      newUsers.push(result);
    }

    return newUsers.map((user, index) => {
      return {
        userId: user.user_id,
        amount: users[index].amount,
      };
    });
  };
}

export default new UserService();