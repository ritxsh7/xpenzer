import React from "react";
import GroupDisplay from "./GroupDisplay";
import { NavLink } from "react-router-dom";

const GroupList = ({ groups }) => {
  return (
    <div className="space-y-4 mt-8">
      {groups?.map((group) => (
        <NavLink to={`group/${group.group_id}`} key={group.group_id}>
          <GroupDisplay group={group} />
        </NavLink>
      ))}
    </div>
  );
};

export default GroupList;
