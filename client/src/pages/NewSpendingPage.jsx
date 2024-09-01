import React from "react";
import NewSpendingForm from "../components/spendings/NewSpendingForm";
import Header from "../components/home/Header";
import { spendingStyles } from "../components/spendings/styles";
import Drawer from "../components/common/Drawer";

const NewSpendingPage = () => {
  /* NewSpendingPage comp here */

  return (
    <div className={spendingStyles.container}>
      <Header />
      <NewSpendingForm />
      <Drawer />
    </div>
  );
};

export default NewSpendingPage;
