import React, { useEffect } from "react";
import { spendingsApi } from "../../api/modules/spendings";
import Spending from "./Spending";

const SpendingList = () => {
  const loadAllSpendings = async () => {
    try {
      const res = await spendingsApi.getAllSpendings(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadAllSpendings();
  }, []);
  return (
    <div>
      Spendging list here
      <Spending id="80" />
    </div>
  );
};

export default SpendingList;
