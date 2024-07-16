import { StatusCodes } from "http-status-codes";
import db from "../../config/database.js";

export const addNewExpense = async (expense) => {
  const CREATE_EXPENSE =
    "INSERT INTO USER_EXPENSES(SPENDING_ID, AMOUNT) VALUES ($1, $2) RETURNING *";

  try {
    const newExpenseResult = await db.query(CREATE_EXPENSE, [
      expense.spendingId,
      expense.amount,
    ]);

    const newExpense = newExpenseResult.rows[0];
    return { result: newExpense };
  } catch (error) {
    console.log("Error while adding new expense: " + error);
    return { error };
  }
};
