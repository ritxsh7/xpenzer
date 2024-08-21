import React from "react";
import NewSpendingForm from "../components/spendings/NewSpendingForm";
import Header from "../components/home/Header";
import { spendingStyles } from "../components/spendings/styles";

const NewSpendingPage = () => {
  return (
    <div className={spendingStyles.container}>
      <Header />
      <NewSpendingForm />
    </div>
  );
};

export default NewSpendingPage;
