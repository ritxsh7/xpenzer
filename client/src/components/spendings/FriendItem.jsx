import React from "react";
import { homeStyles } from "../home/styles";
import AvatarComp from "../common/Avatar";

const FriendItem = ({ friend, setContributors }) => {
  const handleAdd = (e) => {
    // e.target;
    console.log(friend);
    setContributors((curr) => [...curr, friend]);
  };

  return (
    <div onClick={handleAdd}>
      <div className={`${homeStyles.contributor.profile} py-2`}>
        <AvatarComp name={friend.username} color={friend.profile_color} />
        <p>{friend.username} </p>
      </div>
    </div>
  );
};

export default FriendItem;
