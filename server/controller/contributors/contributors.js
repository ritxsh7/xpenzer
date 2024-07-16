import { StatusCodes } from "http-status-codes";
import db from "../../config/database.js";

export const addNewContributer = async (contributer) => {
  const ADD_CONTRIBUTORS =
    "INSERT INTO CONTRIBUTORS(SPENDING_ID, USER_ID, AMOUNT) VALUES ($1, $2, $3) RETURNING *";

  try {
    const newContributer = await db.query(ADD_CONTRIBUTORS, [
      contributer.spendingId,
      contributer.userId,
      contributer.amount,
    ]);
    return { result: newContributer.rows[0] };
  } catch (error) {
    console.log("Error while adding contributers " + error);
    return { error };
  }
};
