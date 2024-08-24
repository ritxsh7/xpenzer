import db from "../config/database.js";
import { daysOfMonth } from "../utils/constants.js";
import { dateNow } from "../utils/constants.js";

class SpendingService {
  // ALL THE SPENDINGS ALL TIME / PAST MONTH
  async getAllSpendings(userId, all) {
    const GET_ALL_SPENDINGS =
      "SELECT * FROM spendings WHERE user_id = $1 ORDER BY date DESC";
    const GET_THIS_MONTHS_SPENDINGS =
      "SELECT * FROM spendings WHERE user_id = $1 AND date BETWEEN $2 AND $3 ORDER BY date DESC";

    const params = all
      ? [userId]
      : [userId, daysOfMonth.startDate, daysOfMonth.endDate];

    const SQL = all ? GET_ALL_SPENDINGS : GET_THIS_MONTHS_SPENDINGS;
    const { result, error } = await db.query(SQL, params);
    if (result) return result.rows;
    if (error) throw error;
  }

  async getAllExpenses(userId) {
    const GET_ALL_EXPENSES =
      "SELECT * FROM personal_expenses WHERE user_id = $1 ORDER BY date DESC";
    const { result, error } = await db.query(GET_ALL_EXPENSES, [userId]);
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
