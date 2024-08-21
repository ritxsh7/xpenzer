import React from "react";
import NewSpendingForm from "../components/spendings/NewSpendingForm";
import Header from "../components/home/Header";

const NewSpendingPage = () => {
  return (
    <div className="p-5 h-[100vh] flex flex-col">
      <Header />
      <NewSpendingForm />
    </div>
  );
};

export default NewSpendingPage;
