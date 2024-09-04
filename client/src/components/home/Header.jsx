import React from "react";
import logo from "../../assets/header-logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { homeStyles } from "./styles";

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
          <IoMdNotificationsOutline />
        </div>
      </div>
    </div>
  );
};

export default Header;
