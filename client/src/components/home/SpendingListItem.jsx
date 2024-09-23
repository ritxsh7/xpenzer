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
      {<ContributorList id={spending.spending_id} open={expand} />}
    </div>
  );
};

export default SpendingListItem;
