import db from "../config/database.js";
import colors from "../utils/colors.js";
import friends from "./friends.js";

class UserService {
  // CREATE USER
  createUser = async (username, phone, password) => {
    const CREATE_USER =
      "INSERT INTO users(username, phone, password, profile_color) VALUES ($1, $2, $3, $4) RETURNING username, password, phone";

    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    const { result, error } = await db.query(CREATE_USER, [
      username,
      phone,
      password,
      randomColor,
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
      "INSERT INTO users(username, is_registered) VALUES ($1, false) RETURNING user_id, username";

    const { result, error } = await db.query(CREATE_UNREGISTERED_USER, [
      user.friend_name,
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
        friend_id: user.user_id,
        amount: users[index].amount,
      };
    });
  };
}

export default new UserService();
