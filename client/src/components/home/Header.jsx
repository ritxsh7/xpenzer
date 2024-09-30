import React from "react";
import logo from "../../assets/header-logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { homeStyles } from "./styles";

const NotificationBadge = (number) => {
  return (
    <div className="w-[1rem] h-[1rem] flex items-center justify-center bg-blue-600 rounded-full absolute -right-1 text-[0.65rem]">
      2
    </div>
  );
};

const Header = () => {
  /* Header comp here */

  return (
    <div className={homeStyles.header.container}>
      <div className={homeStyles.header.wrapper}>
        <div className={homeStyles.header.left}>
          <img src={logo} className={homeStyles.header.logo}></img>
        </div>
        <div className={homeStyles.header.right}>
          <IoIosSearch />
          <div className="relative">
            <NotificationBadge />
            <IoMdNotificationsOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
