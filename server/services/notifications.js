import db from "../config/database.js";

class Notifications {
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
}

export default new Notifications();
