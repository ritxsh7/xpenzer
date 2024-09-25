import React from "react";

const SettleDialog = ({ handleClick }) => {
  return (
    <div>
      <button
        className="w-full bg-[#5c6af5] px-3 py-2 rounded-lg text-sm"
        onClick={() => handleClick(true)}
      >
        Settle balance
      </button>
    </div>
  );
};

export default SettleDialog;
