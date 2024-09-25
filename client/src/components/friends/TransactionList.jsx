import React from "react";
import Transaction from "./Transaction";

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-3 my-6 mb-16">
      {transactions.map((trx) => (
        <Transaction item={trx} key={trx.contri_id} />
      ))}
    </div>
  );
};

export default TransactionList;
