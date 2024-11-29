import React, { useRef } from "react";
import Transaction from "./Transaction";
import { BsDownload } from "react-icons/bs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadList from "../layout/DownloadList";

const TransactionList = ({ transactions, setSettling }) => {
  /* TransactionList comp here*/

  //ref
  const transactionListRef = useRef(null);

  return (
    <div className="flex flex-col">
      <div className="absolute right-8 top-[17.5rem]">
        <PDFDownloadLink
          document={<DownloadList transactions={transactions} />}
          fileName="transactions.pdf"
        >
          <BsDownload />
        </PDFDownloadLink>
      </div>
      <div className="flex flex-col gap-3 my-6 mb-16" ref={transactionListRef}>
        {transactions.map((trx) => (
          <Transaction
            item={trx}
            key={trx.contri_id}
            setSettling={setSettling}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
