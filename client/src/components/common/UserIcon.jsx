import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { homeStyles } from "../home/styles";

const UserIcon = () => {
  return (
    <div className={homeStyles.user.container}>
      <div className={homeStyles.user.icon}>
        <FaUserAlt className="text-xs" />
      </div>
      <div className={homeStyles.user.message}>
        <p className="text-xs">Welcome back!</p>
        <p className="text-xs">Ritesh</p>
      </div>
    </div>
  );
};

export default UserIcon;
