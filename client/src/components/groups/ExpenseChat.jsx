import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseChat = ({ expenses }) => {
  return (
    <div>
      {expenses.map((exp) => (
        <ExpenseItem expense={exp} key={exp.spending_id} />
      ))}
    </div>
  );
};

export default ExpenseChat;
