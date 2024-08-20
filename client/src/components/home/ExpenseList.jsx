import React from "react";
import ListItem from "./ListItem";
import { homeStyles } from "./styles";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="py-4">
      {expenses.map((exp) => (
        <div
          className={homeStyles.spendingItemList.wrapper}
          key={exp.expense_id}
        >
          <ListItem spending={exp} />
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
