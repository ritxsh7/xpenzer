import React from "react";
import ListItem from "./ListItem";
import { homeStyles } from "./styles";

const ExpenseList = ({ expenses }) => {
  return expenses.length > 0 ? (
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
  ) : (
    <div className="mt-12">Your have no expenses</div>
  );
};

export default ExpenseList;
