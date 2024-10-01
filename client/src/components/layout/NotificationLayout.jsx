import React, { useEffect } from "react";
import AvatarComp from "../common/Avatar";
import { NavLink, useNavigate } from "react-router-dom";

const NotificationLayout = ({ noti, setOpen }) => {
  /* NotificationLayout comp here */

  const navigate = useNavigate();

  const redirectTo = (type) => {
    switch (type) {
      case "MUTUAL_SPENDING":
        return `/friends/transactions/${noti.sender_id}`;
      case "GROUP_SPENDING":
        return `/groups/group/${noti.content.groupId}`;
    }
  };

  const handleNavigation = () => {
    let url = redirectTo(noti.notification_type);
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      <div
        className="bg-[#1f1f1f] h-[4rem] rounded-md flex items-center gap-2 p-2"
        onClick={handleNavigation}
      >
        <AvatarComp
          name={noti.content.groupName || noti.content.senderName}
          size={25}
        />
        <p className="text-xs text-left font-normal">{noti.message}</p>
      </div>
    </>
  );
};

export default NotificationLayout;
