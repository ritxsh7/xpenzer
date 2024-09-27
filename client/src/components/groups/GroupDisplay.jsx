import React from "react";
import AvatarComp from "../common/Avatar";
import groupStyles from "./styles";

const GroupDisplay = ({ group }) => {
  return (
    <>
      <div className={groupStyles.display.container}>
        <AvatarComp name={group.group_name} color={group.group_profile} />
        <div className={groupStyles.display.details}>
          <p className={groupStyles.display.name}>{group.group_name}</p>
          <p className={groupStyles.display.activity}>{group.lastActivity}</p>
        </div>
      </div>
    </>
  );
};

export default GroupDisplay;
