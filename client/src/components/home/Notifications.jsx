import React from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { homeStyles } from "./styles";
import NotificationLayout from "../layout/NotificationLayout";

const Notifications = ({ open, setOpen, notifications }) => {
  return (
    <div className={homeStyles.header.notifications.wrapper(open)}>
      <div className={homeStyles.header.notifications.container}>
        <h1 className={homeStyles.header.notifications.title}>
          Your notifications
        </h1>
        <div className="flex flex-col gap-3 my-4">
          {notifications.map((noti) => (
            <NotificationLayout noti={noti} />
          ))}
        </div>
      </div>
      <div
        className={homeStyles.header.notifications.close}
        onClick={() => setOpen(false)}
      >
        <RiCloseLargeLine />
      </div>
    </div>
  );
};

export default Notifications;
