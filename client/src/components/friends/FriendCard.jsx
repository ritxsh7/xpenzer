import React from "react";
import AvatarComp from "../common/Avatar";
import styles from "./styles";

const FriendCard = (friend) => {
  return (
    <div key={friend.id} className={styles.friendCard.wrapper}>
      <div className={styles.friendCard.avatar}>
        <AvatarComp name={friend.friend_name} />
        <p className={styles.friendCard.name}>{friend.friend_name}</p>
      </div>
      <div className={styles.friendCard.amount(friend.net_balance)}>
        <span>
          {friend.net_balance > 0 ? " - " : friend.net_balance < 0 ? " + " : ""}
        </span>
        ₹{Math.abs(friend.net_balance).toFixed(2)}
      </div>
    </div>
  );
};

export default FriendCard;
