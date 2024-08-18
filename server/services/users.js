import db from "../config/database.js";

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
}

export default new UserService();
