import React, { useEffect } from "react";
import { spendingsApi } from "../api/modules/spendings";

const SpendingList = () => {
  const loadAllSpendings = async () => {
    try {
      const res = await spendingsApi.getAllSpendings();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadAllSpendings();
  }, []);
  return <div>Spendging list here</div>;
};

export default SpendingList;
