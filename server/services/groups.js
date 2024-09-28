import db from "../config/database.js";
import colors from "../utils/colors.js";

class Group {
  /* Group service here */

  createGroup = async (name) => {
    const CREATE_GROUP =
      "INSERT INTO groups(group_name, group_profile) values ($1, $2) RETURNING group_id";

    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    const { result, error } = await db.query(CREATE_GROUP, [name, randomColor]);

    if (result) return result.rows[0];
    throw error;
  };

  addMembers = async (groupId, members) => {
    const memberValues = members
      .map((member, index) => `($1, $${index + 2})`)
      .join(",");

    const ADD_MEMBERS = `INSERT INTO group_members(group_id, user_id) values ${memberValues} RETURNING *`;

    const { result, error } = await db.query(ADD_MEMBERS, [
      groupId,
      ...members,
    ]);

    if (result) return result.rows;
    throw error;
  };

  getAll = async (userId) => {
    const GET_ALL = "SELECT * FROM user_groups WHERE user_id = $1";

    const { result, error } = await db.query(GET_ALL, [userId]);

    if (result) return result.rows;
    throw error;
  };

  getGroupDetails = async (userId, groupId) => {
    const GET_USERS =
      "SELECT user_id, username, profile_color FROM user_groups WHERE group_id = $1 AND user_id != $2";

    const GET_SPENDINGS = `SELECT spending_id, description, amount, user_id, username, profile_color
      FROM group_spendings_details WHERE group_id = $1 LIMIT 10
    `;

    const [getUsers, getSpendings] = await Promise.all([
      db.query(GET_USERS, [groupId, userId]),
      db.query(GET_SPENDINGS, [groupId]),
    ]);

    if (getUsers.result && getSpendings.result)
      return {
        users: getUsers.result.rows,
        spendings: getSpendings.result.rows,
      };
    throw getSpendings.error || getUsers.error;
  };

  createGroupExpense = async (spendingId, groupId) => {
    const CREATE_EXPENSES = "INSERT INTO group_spendings VALUES ($1, $2)";

    const { result, error } = await db.query(CREATE_EXPENSES, [
      groupId,
      spendingId,
    ]);
    if (result) return result.rows[0];
    throw error;
  };
}

export default new Group();
