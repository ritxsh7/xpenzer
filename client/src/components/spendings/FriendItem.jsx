import React from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch } from "react-redux";
import { addContributor } from "../../store/functions/spending.payload";

const FriendItem = ({ friend, setShowDropdown }) => {
  // States

  const dispatch = useDispatch();

  const handleAdd = () => {
    const contributor = {
      friend_id: friend.friend_id,
      friend_name: friend.friend_name,
      isRegistered: true,
      amount: 0,
    };
    dispatch(addContributor(contributor));
    setShowDropdown(false);
  };

  return (
    <div onClick={handleAdd}>
      <div className={spendingStyles.friendItem.container}>
        <AvatarComp
          name={friend.friend_name}
          color={friend.profile_color}
          size="20"
        />
        <p className="text-sm">{friend.friend_name} </p>
      </div>
    </div>
  );
};

export default FriendItem;
