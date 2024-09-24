import React from "react";
import Transaction from "./Transaction";

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((trx) => (
        <Transaction item={trx} />
      ))}
    </div>
  );
};

export default TransactionList;
