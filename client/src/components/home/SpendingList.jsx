import React from "react";

import SpendingListItem from "./SpendingListItem";

const SpendingList = ({ spendings }) => {
  return (
    <div className="py-4">
      {spendings?.map((spending) => (
        <SpendingListItem key={spending.spending_id} {...spending} />
      ))}
    </div>
  );
};

export default SpendingList;
