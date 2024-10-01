import db from "../config/database.js";

class Notifications {
  /* Notifications service here */

  sendFriendRequest = async (user, friendId) => {
    const SEND_FRIEND_REQ = `
            INSERT INTO notifications(user_id, sender_id, message, content, notification_type)
            VALUES (
                $1, $2, $3, $4, $5
            )
        `;

    const msg = `${user.username} sent you a friend request`;

    const content = JSON.stringify({
      senderAvatar: user.profile,
      senderName: user.username,
    });

    const { result, error } = await db.query(SEND_FRIEND_REQ, [
      friendId,
      user.userId,
      msg,
      content,
      "FRIEND_REQ",
    ]);

    if (result) return result.rows;
    throw error;
  };

  notifySpendings = async (user, content, message, type, receivers) => {
    const params = receivers
      .map((_, i) => `($1, $2, $3, $4, $${i + 5})`)
      .join(", ");

    const NOTIFY_CONTRIBUTORS = `
    INSERT INTO notifications (sender_id, message, content, notification_type, user_id )
    VALUES
    ${params}
    `;

    const { result, error } = await db.query(NOTIFY_CONTRIBUTORS, [
      user,
      message,
      JSON.stringify(content),
      type,
      ...receivers,
    ]);

    if (result) return result.rows;
    throw error;
  };

  getAllNotifications = async (userId) => {
    const RECEIVE_NOTIS = `
      SELECT * FROM notifications WHERE user_id = $1 AND is_read = false
    `;

    const { result, error } = await db.query(RECEIVE_NOTIS, [userId]);

    if (result) return result.rows;
    throw error;
  };

  markRead = async (id) => {
    const SQL = `
      UPDATE notifications SET is_read = true WHERE notification_id = $1
    `;

    const { result, error } = await db.query(SQL, [id]);

    if (result) return result.rows;
    throw error;
  };
}

export default new Notifications();
