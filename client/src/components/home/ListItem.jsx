import React from "react";
import { homeStyles } from "./styles";
import { dateFormat } from "../../utils/date.js";

const ListItem = ({ spending }) => {
  return (
    <div className={homeStyles.spendingItemList.container}>
      <div className={homeStyles.spendingItemList.left}>
        <p className="text-sm">{spending.description}</p>
        <p className="text-[14px] text-gray-400">
          {new Date(spending.date).toLocaleDateString("en-IN", dateFormat)}
        </p>
      </div>
      <div className={homeStyles.spendingItemList.right}>
        ₹{spending.amount}
      </div>
    </div>
  );
};

export default ListItem;
