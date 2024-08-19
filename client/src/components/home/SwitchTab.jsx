import React, { useState } from "react";
import { homeStyles } from "./styles";
const SwitchTab = () => {
  const [active, setActive] = useState(0);

  return (
    <div className={homeStyles.switchTab.wrapper}>
      <div className={homeStyles.switchTab.subContainer}>
        <div
          onClick={() => setActive(0)}
          className={`${homeStyles.switchTab.bg} ${
            active === 0 && homeStyles.switchTab.active
          }`}
        >
          Spendings
        </div>
        <div
          onClick={() => setActive(1)}
          className={`${homeStyles.switchTab.bg} ${
            active === 1 && homeStyles.switchTab.active
          }`}
        >
          Expenses
        </div>
      </div>
    </div>
  );
};

export default SwitchTab;
