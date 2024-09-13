import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const StatsCard = ({ color }) => {
  const score = "40";

  return (
    <div className="flex items-center bg-[#121212] p-3 my-4 rounded-xl shadow-lg w-full justify-between">
      <div
        className={`${color} rounded-full p-2 flex items-center justify-center`}
      >
        <AiOutlinePlus className="text-white text-2xl" />
      </div>
      <div className="w-full">
        <p className="text-[#5c6af5] text-xs">Total Score</p>
        <p className="text-white text-lg font-bold">{score}</p>
      </div>
    </div>
  );
};

export default StatsCard;
