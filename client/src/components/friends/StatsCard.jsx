import React from "react";
import { FaArrowTurnUp } from "react-icons/fa6";
import { FaArrowTurnDown } from "react-icons/fa6";

const StatsCard = ({ color, name, score, fullWidth, up }) => {
  return (
    <div
      className={`flex items-center bg-[#121212] p-3 my-4 ${
        fullWidth ? "w-full" : "w-[48%]"
      } rounded-xl shadow-lg justify-between`}
    >
      <div
        className={`${color} rounded-full p-2 flex items-center justify-center`}
      >
        {up ? <FaArrowTurnUp /> : <FaArrowTurnDown />}
      </div>
      <div className="w-full">
        <p className="text-[#5c6af5] text-xs">{name}</p>
        <p className="text-white text-lg font-bold">₹ {score}</p>
      </div>
    </div>
  );
};

export default StatsCard;
