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
        <div className={homeStyles.header.notifications.list}>
          {notifications?.length > 0 ? (
            notifications?.map((noti) => (
              <NotificationLayout
                noti={noti}
                key={noti.notification_id}
                setOpen={setOpen}
              />
            ))
          ) : (
            <p className="text-sm font-normal">No notifications</p>
          )}
        </div>
      </div>
      <div
        className={homeStyles.header.notifications.close(open)}
        onClick={() => setOpen(false)}
      >
        <RiCloseLargeLine />
      </div>
    </div>
  );
};

export default Notifications;
