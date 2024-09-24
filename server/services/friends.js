import db from "../config/database.js";

class Friends {
  createUnregisteredFriend = async (userId, friendId) => {
    // CREATE UNREGISTERED FRIEND
    const CREATE_UNREGISTERED_FRIEND =
      "INSERT INTO friends(user_id, friend_id) VALUES ($1, $2)";

    const { result, error } = await db.query(CREATE_UNREGISTERED_FRIEND, [
      userId,
      friendId,
    ]);

    if (result) return result.rows[0];
    throw error;
  };

  getAllFriends = async (userId) => {
    const GET_ALL_FRIENDS = "SELECT * FROM user_friends WHERE user_id = $1";
    const GET_LENDINGS =
      "SELECT SUM(net_balance) FROM user_friends WHERE user_id = $1 AND net_balance < 0";

    const GET_BORROWINGS =
      "SELECT SUM(net_balance) FROM user_friends WHERE user_id = $1 AND net_balance > 0";

    const getFriends = db.query(GET_ALL_FRIENDS, [userId]);
    const getLendings = db.query(GET_LENDINGS, [userId]);
    const getBorrowings = db.query(GET_BORROWINGS, [userId]);

    const result = await Promise.all([getFriends, getLendings, getBorrowings]);

    if (result)
      return {
        friends: result[0].result.rows,
        lendings: result[1].result.rows[0].sum,
        borrowings: result[2].result.rows[0].sum,
      };
    throw error;
  };

  getFriendsLike = async (userId, name) => {
    const GET_FRIENDS_LIKE =
      "SELECT * FROM user_friends WHERE user_id = $1 AND LOWER(friend_name) like LOWER($2)";

    const searchName = `%${name}%`;

    const { result, error } = await db.query(GET_FRIENDS_LIKE, [
      userId,
      searchName,
    ]);

    if (result) return result.rows;
    throw error;
  };

  getUsersLike = async (phone) => {
    const GET_FRIENDS_LIKE =
      "SELECT user_id, username, phone, profile_color FROM users WHERE phone LIKE $1";

    const { result, error } = await db.query(GET_FRIENDS_LIKE, [`%${phone}%`]);

    if (result) return result.rows;
    throw error;
  };

  addFriend = async (userId, friendId) => {
    const ADD_FRIEND = "INSERT INTO friends VALUES ($1, $2), ($2, $1)";
    const { result, error } = await db.query(ADD_FRIEND, [userId, friendId]);

    if (result) return result.rows;
    throw error;
  };

  getContributions = async (userId, friendId, start, end) => {
    const GET_FRIEND_CONTRIBUTIONS = `
      SELECT 
        spending_user, 
        SUM(contri_amount),
        json_agg(                        
          json_build_object(
            'cid',contri_id,
            'amount',contri_amount,
            'date', spending_date,
            'description', description
          )) as byUser
        FROM user_contributions
        WHERE spending_user = $1 AND contri_user = $2 AND spending_date BETWEEN $3::DATE AND $4::DATE
        GROUP BY spending_user, spending_date ORDER BY spending_date DESC`;

    const GET_USER_CONTRIBUTIONS = `
        SELECT 
          spending_user,
          SUM(contri_amount),
          json_agg(                        
            json_build_object(
              'cid',contri_id,
              'amount',contri_amount,
              'date', spending_date,
              'description', description
          )) as byFriend
        FROM user_contributions 
        WHERE spending_user = $2 AND contri_user = $1 AND spending_date BETWEEN $3::DATE AND $4::DATE
        GROUP BY spending_user, spending_date ORDER BY spending_date DESC`;

    try {
      const friendContributions = await db.query(GET_FRIEND_CONTRIBUTIONS, [
        userId,
        friendId,
        new Date(start),
        new Date(end),
      ]);

      const userContributions = await db.query(GET_USER_CONTRIBUTIONS, [
        userId,
        friendId,
        new Date(start),
        new Date(end),
      ]);

      return {
        friendContributions: friendContributions.result.rows[0],
        userContributions: userContributions.result.rows[0],
      };
    } catch (error) {
      throw error;
    }
  };
}

export default new Friends();
