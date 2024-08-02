import React, { useEffect } from "react";
import { spendingsApi } from "../api/modules/spendings";

const HomePage = () => {
  useEffect(() => {
    loadAllSpendings();
  }, []);

  const loadAllSpendings = async () => {
    try {
      const res = await spendingsApi.getAllSpendings();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>HomePage</div>;
};

export default HomePage;
