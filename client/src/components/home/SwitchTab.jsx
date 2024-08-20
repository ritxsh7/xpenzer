import React from "react";
import { homeStyles } from "./styles";
const SwitchTab = ({ activeTab, setActiveTab }) => {
  return (
    <div className={homeStyles.switchTab.wrapper}>
      <div className={homeStyles.switchTab.subContainer}>
        <div
          onClick={() => setActiveTab("spendings")}
          className={`${homeStyles.switchTab.bg} ${
            activeTab === "spendings" && homeStyles.switchTab.active
          }`}
        >
          Spendings
        </div>
        <div
          onClick={() => setActiveTab("expenses")}
          className={`${homeStyles.switchTab.bg} ${
            activeTab === "expenses" && homeStyles.switchTab.active
          }`}
        >
          Expenses
        </div>
      </div>
    </div>
  );
};

export default SwitchTab;
