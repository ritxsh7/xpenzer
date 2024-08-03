import React from "react";
import { HiBars3 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { homeStyles } from "./styles";
import UserIcon from "../common/UserIcon";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className={homeStyles.header.container}>
      <div className={homeStyles.header.left}>
        <HiBars3 />
        <h2>Home</h2>
      </div>
      <div className={homeStyles.header.user}>
        <UserIcon />
        <p className={homeStyles.header.username}>
          {user.username.split(" ")[0]}
        </p>
      </div>
      <FaSearch />
    </div>
  );
};

export default Header;
