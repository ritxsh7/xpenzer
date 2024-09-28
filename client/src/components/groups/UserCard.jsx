import React from "react";
import styles from "../friends/styles";
import { useSelector } from "react-redux";
import AvatarComp from "../common/Avatar";

const UserCard = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className={styles.friendCard.wrapper()}>
      <div className={styles.friendCard.avatar}>
        <AvatarComp name={user.username} />
        <p className={styles.friendCard.name}>You</p>
      </div>
    </div>
  );
};

export default UserCard;
