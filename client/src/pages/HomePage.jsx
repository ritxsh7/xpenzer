import React from "react";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import UserIcon from "../components/common/UserIcon";
import SwitchTab from "../components/home/SwitchTab";
import SpendingList from "../components/home/SpendingList";

const HomePage = () => {
  return (
    <div className="p-5">
      <Header />
      <UserIcon />
      <Banner />
      <SwitchTab />
      <SpendingList />
    </div>
  );
};

export default HomePage;
