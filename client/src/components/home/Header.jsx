import React from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { homeStyles } from "./styles";

const Header = () => {
  return (
    <div className={homeStyles.header.container}>
      <div className={homeStyles.header.wrapper}>
        <div className={homeStyles.header.left}>
          <HiMiniBars3CenterLeft />
          <p>Home</p>
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
