import db from "../config/database.js";
import users from "./users.js";

class Contributions {
  createNewContribution = async (spending_id, user_id, amount) => {
    const CREATE_CONTRIBUTION =
      "INSERT INTO contributions(spending_id, user_id, amount) VALUES ($1, $2, $3) RETURNING *";
    const { result, error } = await db.query(CREATE_CONTRIBUTION, [
      spending_id,
      user_id,
      amount,
    ]);
    if (result) return result.rows[0];
    throw error;
  };

  // ADD ALL CONTRIBUTORS
  createManyContributions = async (spending_id, contributions) => {
    let newContributions = [];
    for (const contribution of contributions) {
      const newContribution = await this.createNewContribution(
        spending_id,
        contribution.userId,
        contribution.amount
      );
      newContributions.push(newContribution);
    }
    return newContributions;
  };

  // UNREGISTERED CONTRIBUTIONS
  createUnregisteredContribution = async (
    userList,
    spending_id,
    currUserId
  ) => {
    const newUsers = await users.createManyUnregisteredUser(
      userList,
      currUserId
    );
    const newUnregisteredContributions = await this.createManyContributions(
      spending_id,
      newUsers
    );
    return newUnregisteredContributions;
  };
}
export default new Contributions();