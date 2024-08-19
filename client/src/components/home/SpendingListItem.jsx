import React from "react";
import { homeStyles } from "./styles";

const SpendingListItem = () => {
  return (
    <div className={homeStyles.spendingItemList.wrapper}>
      <div className={homeStyles.spendingItemList.container}>
        <div className={homeStyles.spendingItemList.left}>
          <p className="text-lg">Movie Tickets</p>
          <p className="text-[14px] text-gray-400">Mon 12 Jan , 12:25PM</p>
        </div>
        <div className={homeStyles.spendingItemList.right}>₹1200.00</div>
      </div>
    </div>
  );
};

export default SpendingListItem;
