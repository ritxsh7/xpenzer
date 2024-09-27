import React from "react";
import AvatarComp from "../common/Avatar";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";

const GroupHeader = ({ name, profile, members }) => {
  /*GroupHeader comp here */

  let memberString = members
    .map((mem) => mem.username)
    .join(", ")
    .concat(", You");

  return (
    <div className="flex items-center bg-[#121212] p-3">
      <div className="mr-1 text-xl">
        <NavLink to="/groups">
          <BiArrowBack />
        </NavLink>
      </div>
      <AvatarComp name={name} color={profile} size="40" />

      <div className="text-left ml-2">
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="text-[0.65rem]">
          {memberString.length > 25
            ? memberString.substr(0, 25).concat("...")
            : memberString}
        </p>
      </div>

      <div className="flex text-xl ml-auto gap-1 items-center">
        <FaUserFriends />
        <HiOutlineDotsVertical />
      </div>
    </div>
  );
};

export default GroupHeader;
