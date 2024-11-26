import React from "react";

import SpendingListItem from "./SpendingListItem";
import ListSkeleton from "../skeletons/ListSkeleton";

const SpendingList = ({ spendings }) => {

  if(!spendings) return <ListSkeleton />

  if(spendings.length == 0) return <div className="mt-12">Your have no spendings</div>

  return <div className="py-4">
      {spendings?.map((spending) => (
        <SpendingListItem key={spending.spending_id} {...spending} />
      ))}
    </div>
};

export default SpendingList;
