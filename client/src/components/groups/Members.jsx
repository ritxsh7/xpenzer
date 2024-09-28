import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import FriendCard from "../friends/FriendCard";
import UserCard from "./UserCard";
import { NavLink } from "react-router-dom";

const Members = ({ members }) => {
  //store
  const { friends } = useSelector((store) => store.friends);
  const { user } = useSelector((store) => store.user);

  const friendsMap = new Map(
    friends.map((friend) => [friend.friend_id, friend])
  );

  return (
    friends && (
      <div className="w-full mb-[10vh]">
        <div className="flex gap-2 items-center">
          <FaUserFriends />
          <h1 className="text-lg font-semibold text-left">Group members</h1>
        </div>
        <div className="mt-6">
          <UserCard />
          {members.map((mem) => {
            let isFriend = friendsMap.get(mem.user_id);
            return isFriend ? (
              <NavLink to="/friends">
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
