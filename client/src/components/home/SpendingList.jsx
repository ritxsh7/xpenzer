import React from "react";

import SpendingListItem from "./SpendingListItem";

const SpendingList = ({ spendings }) => {
  return spendings.length > 0 ? (
    <div className="py-4">
      {spendings?.map((spending) => (
        <SpendingListItem key={spending.spending_id} {...spending} />
      ))}
    </div>
  ) : (
    <div className="mt-12">Your have no spendings</div>
  );
};

export default SpendingList;
