import { useState } from "react";
import { homeStyles } from "./styles";

import ContributorList from "./ContributorList.jsx";
import ListItem from "./ListItem.jsx";
import useFetch from "../../hooks/useFetch.js";
import { spendingsApi } from "../../api/modules/spendings.js";

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
