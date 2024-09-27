import React from "react";

const ExpenseItem = ({ expense }) => {
  return <div>{expense.description}</div>;
};

export default ExpenseItem;
