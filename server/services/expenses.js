import db from "../config/database.js";
import { dateNow } from "../utils/constants.js";

class PersonalExpenses {
  createNewExpense = async (userId, amount, description, date) => {
    const CREATE_EXPENSE =
      "INSERT INTO personal_expenses(user_id, amount, description, date) VALUES ($1, $2, $3, $4) RETURNING *";
    const { result, error } = await db.query(CREATE_EXPENSE, [
      userId,
      amount,
      description,
      date || new Date().toLocaleDateString("en-IN", dateNow.options),
    ]);
    if (result) return result.rows[0];
    throw error;
  };
}

export default new PersonalExpenses();
