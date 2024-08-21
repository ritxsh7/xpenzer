import React from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";

const FriendItem = ({
  friend,
  setContributors,
  setShowDropdown,
  totalAmount,
}) => {
  console.log(totalAmount);

  const handleAdd = (totalAmount) => {
    setContributors((curr) => {
      console.log(totalAmount);
      const amount = totalAmount / (curr.length + 1);
      return [...curr, { ...friend, amount }];
    });
    setShowDropdown(false);
  };

  return (
    <div onClick={() => handleAdd(totalAmount)}>
      <div className={spendingStyles.friendItem.container}>
        <AvatarComp name={friend.friend_name} color={friend.profile_color} />
        <p>{friend.friend_name} </p>
      </div>
    </div>
  );
};

export default FriendItem;
