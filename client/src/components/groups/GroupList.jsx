import React from "react";
import GroupDisplay from "./GroupDisplay";

const GroupList = ({ groups }) => {
  return (
    <div className="space-y-4 mt-8">
      {groups.map((group) => (
        <GroupDisplay group={group} key={group.group_id} />
      ))}
    </div>
  );
};

export default GroupList;
