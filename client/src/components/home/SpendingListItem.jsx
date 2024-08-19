import { useState } from "react";
import { homeStyles } from "./styles";
import { dateFormat } from "../../utils/date.js";
import ContributorList from "./ContributorList.jsx";

const SpendingListItem = (spending) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={homeStyles.spendingItemList.wrapper}
      onClick={() => setExpand(!expand)}
    >
      <div className={homeStyles.spendingItemList.container}>
        <div className={homeStyles.spendingItemList.left}>
          <p className="text-lg">{spending.description}</p>
          <p className="text-[14px] text-gray-400">
            {new Date(spending.date).toLocaleDateString("en-IN", dateFormat)}
          </p>
        </div>
        <div className={homeStyles.spendingItemList.right}>
          ₹{spending.amount}
        </div>
      </div>
      {expand && <ContributorList id={spending.spending_id} />}
    </div>
  );
};

export default SpendingListItem;
