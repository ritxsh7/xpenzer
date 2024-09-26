import React from "react";
import AvatarComp from "../common/Avatar";

const GroupDisplay = ({ group }) => {
  return (
    <>
      <div className="flex items-center text-sm bg-[#1c1c1c] p-3 rounded-lg shadow">
        <AvatarComp name={group.group_name} color={group.group_profile} />
        <div className="ml-4 text-left">
          <p className="font-medium">{group.group_name}</p>
          <p className=" text-gray-400">{group.lastActivity}</p>
        </div>
      </div>
    </>
  );
};

export default GroupDisplay;
