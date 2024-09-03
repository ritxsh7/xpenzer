import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { homeStyles } from "../home/styles";
import { useSelector } from "react-redux";

const UserIcon = () => {
  /* UserIcon comp here */

  // Store
  const { user } = useSelector((store) => store.user);

  return (
    <div className={homeStyles.user.container}>
      <div className={homeStyles.user.icon}>
        <FaUserAlt className="text-xs" />
      </div>
      <div className={homeStyles.user.message}>
        <p className="text-xs">Welcome back!</p>
        <p className="text-xs">{user.username}</p>
      </div>
    </div>
  );
};

export default UserIcon;
