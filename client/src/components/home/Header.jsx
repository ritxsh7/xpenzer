import React, { useState } from "react";
import logo from "../../assets/header-logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { homeStyles } from "./styles";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";

const NotificationBadge = ({ number }) => {
  return <div className={homeStyles.header.notifications.badge}>{number}</div>;
};

const Header = () => {
  /* Header comp here */

  //stores
  const { notifications } = useSelector((store) => store.friends);

  //states
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={homeStyles.header.container}>
      <div className={homeStyles.header.wrapper}>
        <div className={homeStyles.header.left}>
          <img src={logo} className={homeStyles.header.logo}></img>
        </div>
        <div className={homeStyles.header.right}>
          <IoIosSearch />
          <div className="relative" onClick={() => setShowNotifications(true)}>
            <NotificationBadge number={notifications.length} />
            <IoMdNotificationsOutline />
          </div>
        </div>
      </div>
      <Notifications
        open={showNotifications}
        setOpen={setShowNotifications}
        notifications={notifications}
      />
    </div>
  );
};

export default Header;
