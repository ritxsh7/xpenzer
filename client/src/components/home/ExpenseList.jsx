import React from "react";
import ListItem from "./ListItem";
import { homeStyles } from "./styles";
import ListSkeleton from "../skeletons/ListSkeleton";

const ExpenseList = ({ expenses }) => {

  if(!expenses) return <ListSkeleton />

  if(expenses.length === 0) return <div className="mt-12">Your have no expenses</div>

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
  ) 
};

export default ExpenseList;
