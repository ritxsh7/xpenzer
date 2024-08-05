import db from "../config/database.js";
import { daysOfMonth } from "../utils/constants.js";

class SpendingService {
  // ALL THE SPENDINGS ALL TIME / PAST MONTH
  async getAllSpendings(all, userId) {
    const GET_ALL_SPENDINGS =
      "SELECT * FROM user_spendings WHERE USER_ID = $1 ORDER BY SPENDING_ID DESC";
    const GET_THIS_MONTHS_SPENDINGS =
      "SELECT * FROM user_spendings WHERE USER_ID = $1 AND SPENDING_DATE BETWEEN $2 AND $3 ORDER BY SPENDING_ID DESC";

    const params = all
      ? [userId]
      : [userId, daysOfMonth.startDate, daysOfMonth.endDate];

    const SQL = all ? GET_ALL_SPENDINGS : GET_THIS_MONTHS_SPENDINGS;
    const { result, error } = await db.query(SQL, params);
    if (result) return result;
    if (error) throw error;
  }

  // TOTAL AMOUNT
  async getTotalAmount(userId) {
    const GET_TOTAL_SPENDINGS =
      "SELECT SUM(TOTAL_EXP) AS TOTAL FROM USER_SPENDINGS WHERE USER_ID = $1 AND SPENDING_DATE BETWEEN $2 AND $3";

    const { result, error } = await db.query(GET_TOTAL_SPENDINGS, [
      userId,
      daysOfMonth.startDate,
      daysOfMonth.endDate,
    ]);
    if (result) return result;
    if (error) throw error;
  }

  // GET BY ID
  async getById(spendingId) {
    const GET_BY_ID =
      "SELECT username, amount, friend_id FROM user_friend_contri WHERE spending_id = $1";
    const { result, error } = await db.query(GET_BY_ID, [spendingId]);
    if (result) return result;
    if (error) throw error;
  }
}
export default new SpendingService();
