import React from "react";
import AvatarComp from "../common/Avatar";
import styles from "./styles";

const FriendCard = (friend) => {
  return (
    <div key={friend.id} className={styles.friendCard.wrapper}>
      <div className={styles.friendCard.avatar}>
        <AvatarComp name={friend.name} />
        <p className={styles.friendCard.name}>{friend.name}</p>
      </div>
      <div className={styles.friendCard.amount(friend.balance)}>
        <span>{friend.balance < 0 ? "-" : friend.balance > 0 ? "+" : ""}</span>₹{" "}
        {Math.abs(friend.balance).toFixed(2)}
      </div>
    </div>
  );
};

export default FriendCard;
