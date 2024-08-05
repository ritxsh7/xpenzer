import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import { useNavigate } from "react-router-dom";
import SpendingList from "../components/home/SpendingList";

const HomePage = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(false);
  useEffect(() => {
    navigate(`/?all=${limit}`);
  }, [navigate, limit]);
  return (
    <div className="p-4">
      <Header />
      <Banner />
      <SpendingList />
    </div>
  );
};

export default HomePage;
