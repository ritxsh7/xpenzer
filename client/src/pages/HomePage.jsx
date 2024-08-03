import React from "react";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import ProtectedPage from "./ProtectedPage";

const HomePage = () => {
  return (
    <ProtectedPage>
      <div className="p-4">
        <Header />
        <Banner />
      </div>
    </ProtectedPage>
  );
};

export default HomePage;
