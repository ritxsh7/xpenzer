import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import FriendCard from "../friends/FriendCard";
import UserCard from "./UserCard";
import { NavLink } from "react-router-dom";
import groupStyles from "./styles";

const Members = ({ members }) => {
  //store
  const { friends } = useSelector((store) => store.friends);
  const { user } = useSelector((store) => store.user);

  const friendsMap = new Map(
    friends.map((friend) => [friend.friend_id, friend])
  );

  return (
    friends && (
      <div className={groupStyles.members.wrapper}>
        <div className={groupStyles.members.text}>
          <FaUserFriends />
          <h1 className={groupStyles.members.header}> Group members</h1>
        </div>
        <div className="mt-6">
          <UserCard />
          {members.map((mem) => {
            let isFriend = friendsMap.get(mem.user_id);
            return isFriend ? (
              <NavLink to={`/friends/transactions/${mem.user_id}`}>
                <FriendCard friend={isFriend} key={mem.user_id} />
              </NavLink>
            ) : (
              <FriendCard
                friend={{
                  friend_id: mem.user_id,
                  friend_name: mem.username,
                }}
                notAFriend
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default Members;
