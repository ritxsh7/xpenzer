import React from "react";
import Transaction from "./Transaction";

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {transactions.map((trx) => (
        <Transaction item={trx} key={trx.cid} />
      ))}
    </div>
  );
};

export default TransactionList;
