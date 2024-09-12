import db from "../config/database.js";
import { daysOfMonth } from "../utils/constants.js";
import { dateNow } from "../utils/constants.js";

class SpendingService {
  // ALL THE SPENDINGS ALL TIME / PAST MONTH
  async getAllSpendings(userId, start, end, page) {
    const GET_ALL_SPENDINGS =
      "SELECT * FROM spendings WHERE user_id = $1 AND date BETWEEN $2::DATE AND $3::DATE ORDER BY date DESC, spending_id DESC";

    const { result, error } = await db.query(GET_ALL_SPENDINGS, [
      userId,
      new Date(start),
      new Date(end),
    ]);

    if (result) return result.rows;
    if (error) throw error;
  }

  async getAllExpenses(userId, start, end) {
    const GET_ALL_EXPENSES =
      "SELECT * FROM personal_expenses WHERE user_id = $1 AND date BETWEEN $2::DATE AND $3::DATE ORDER BY date DESC, expense_id DESC";
    const { result, error } = await db.query(GET_ALL_EXPENSES, [
      userId,
      start,
      end,
    ]);
    if (result) return result.rows;
    if (error) throw error;
  }

  // CREATE A NEW SPENDING
  async createNewSpending(userId, amount, description, date) {
    const CREATE_SPENDING =
      "INSERT INTO spendings(user_id, amount, description, date) VALUES ($1, $2, $3, $4) RETURNING *";
    const { result, error } = await db.query(CREATE_SPENDING, [
      userId,
      amount,
      description,
      date || new Date().toLocaleDateString("en-IN", dateNow.options),
    ]);
    if (result) return result.rows[0];
    throw error;
  }

  async getAllContributors(spending_id) {
    const GET_CONTRIBUTORS =
      "SELECT * FROM user_contributions WHERE spending_id = $1";
    const { result, error } = await db.query(GET_CONTRIBUTORS, [spending_id]);
    if (result) return result.rows;
    throw error;
  }

  // TOTAL AMOUNT
  async getTotalAmount(userId) {
    const GET_TOTAL_SPENDINGS =
      "SELECT COALESCE(SUM(amount), 0) AS total_spendings FROM spendings WHERE user_id = $1 AND date >= ($2) UNION ALL SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM personal_expenses WHERE user_id = $1 AND date >= ($2)";

    const { result, error } = await db.query(GET_TOTAL_SPENDINGS, [
      userId,
      daysOfMonth.startDate,
    ]);
    if (result) return result.rows;
    if (error) throw error;
  }
}
export default new SpendingService();
