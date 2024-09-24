import React from "react";
import { homeStyles } from "../home/styles";
import { dateFormat } from "../../utils/date";

const Transaction = ({ item }) => {
  return (
    <div className={`${homeStyles.spendingItemList.container} p-2`}>
      <div className={homeStyles.spendingItemList.left}>
        <p className="text-sm">{item.description}</p>
        <p className="text-[14px] text-gray-400">
          {new Date(item.date).toLocaleDateString("en-IN", dateFormat)}
        </p>
      </div>
      <div className={homeStyles.spendingItemList.right(item.byFriend)}>
        {item.byFriend ? "+" : "-"}₹{item.amount}
      </div>
    </div>
  );
};

export default Transaction;
