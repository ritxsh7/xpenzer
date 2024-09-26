import React from "react";
import AvatarComp from "../common/Avatar";
import styles from "./styles";

const FriendCard = ({ friend, forSearch, added }) => {
  return (
    <div
      key={friend.id}
      className={styles.friendCard.wrapper(forSearch, added)}
    >
      <div className={styles.friendCard.avatar}>
        <AvatarComp name={friend.friend_name} />
        <p className={styles.friendCard.name}>{friend.friend_name}</p>
      </div>
      {!forSearch ? (
        <div className={styles.friendCard.amount(friend.net_balance)}>
          <span>
            {friend.net_balance > 0
              ? " - "
              : friend.net_balance < 0
              ? " + "
              : ""}
          </span>
          ₹{Math.abs(friend.net_balance).toFixed(2)}
        </div>
      ) : added ? (
        <p className="text-red-500">Remove</p>
      ) : (
        <p className="text-blue-500">Add</p>
      )}
    </div>
  );
};

export default FriendCard;
