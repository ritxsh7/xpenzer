import React, { useEffect } from "react";
import { spendingsApi } from "../../api/modules/spendings";
import SpendingListItem from "./SpendingListItem";

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

  return (
    <div className="py-4">
      <SpendingListItem />
      <SpendingListItem />
      <SpendingListItem />
      <SpendingListItem />
      <SpendingListItem />
    </div>
  );
};

export default SpendingList;
