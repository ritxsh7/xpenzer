import React from "react";
import AvatarComp from "../common/Avatar";

const NotificationLayout = ({ noti }) => {
  return (
    <div className="bg-[#1f1f1f] h-[4rem] rounded-md flex items-center gap-2 p-2">
      <AvatarComp
        name={noti.content.groupName || noti.content.senderName}
        size={25}
      />
      <p className="text-xs text-left font-normal">{noti.message}</p>
    </div>
  );
};

export default NotificationLayout;
