import { useState } from "react";
import { homeStyles } from "./styles";

import ContributorList from "./ContributorList.jsx";
import ListItem from "./ListItem.jsx";

const SpendingListItem = (spending) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={homeStyles.spendingItemList.wrapper}
      onClick={() => setExpand(!expand)}
    >
      <ListItem spending={spending} />

      {expand && <ContributorList id={spending.spending_id} />}
    </div>
  );
};

export default SpendingListItem;
