import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseChat = ({ expenses }) => {
  return (
    <div className="my-6 pb-16">
      {expenses.map((exp) => (
        <ExpenseItem expense={exp} key={exp.spending_id} />
      ))}
    </div>
  );
};

export default ExpenseChat;
