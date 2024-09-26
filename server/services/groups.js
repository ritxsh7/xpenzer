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
}

export default new Group();
