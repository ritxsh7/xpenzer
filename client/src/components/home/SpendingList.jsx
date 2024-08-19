import React, { useEffect, useState } from "react";
import { spendingsApi } from "../../api/modules/spendings";
import SpendingListItem from "./SpendingListItem";

const SpendingList = () => {
  const [spendings, setSpendings] = useState([]);

  const loadAllSpendings = async () => {
    try {
      const res = await spendingsApi.getAllSpendings();
      setSpendings(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadAllSpendings();
  }, []);

  return (
    <div className="py-4">
      {spendings.map((spending) => (
        <SpendingListItem key={spending.spending_id} {...spending} />
      ))}
    </div>
  );
};

export default SpendingList;
