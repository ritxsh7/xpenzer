import React from "react";
import AvatarComp from "../common/Avatar";
import { homeStyles } from "../home/styles";

const UserIcon = ({ name, text, color }) => {
  /* UserIcon comp here */

  return (
    <div className={homeStyles.user.container}>
      <AvatarComp name={name} color={color} />
      <div className={homeStyles.user.message}>
        <p className="text-xs">{text}</p>
        <p className="text-xs">{name}</p>
      </div>
    </div>
  );
};

export default UserIcon;
