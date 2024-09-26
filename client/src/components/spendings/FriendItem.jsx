import { useState } from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addContributor } from "../../store/functions/spending.payload";

const FriendItem = ({ friend, setSearchValue }) => {
  /* FriendItem comp here */

  // Store
  const dispatch = useDispatch();
  const { contributors } = useSelector((store) => store.spendingPayload);

  // Handlers
  const handleAdd = (e) => {
    const contributor = {
      friend_id: friend.friend_id,
      friend_name: friend.friend_name,
      isRegistered: true,
      amount: 0,
    };
    dispatch(addContributor(contributor));
    setSearchValue("");
  };

  return (
    <div
      className={`${spendingStyles.friendItem.container} ${
        contributors.find((f) => f.friend_id == friend.friend_id) &&
        "bg-gray-800"
      }`}
      onClick={handleAdd}
    >
      <AvatarComp
        name={friend.friend_name}
        color={friend.profile_color}
        size="20"
      />
      <p className="text-sm">{friend.friend_name} </p>
    </div>
  );
};

export default FriendItem;
