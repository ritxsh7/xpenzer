import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { homeStyles } from "./styles";

const Banner = () => {
  const badges = [
    {
      name: "Personal expenses",
      color: "red",
      element: <FaArrowUp className={homeStyles.banner.arrow("red")} />,
    },
    {
      color: "lime",
      name: "Total lendings",
      element: <FaArrowDown className={homeStyles.banner.arrow("lime")} />,
    },
  ];

  const spending = [80.0, 40.0];

  return (
    <div className="w-full my-10">
      <div className={homeStyles.banner.container}>
        <h2 className={homeStyles.banner.heading}>Total spendings</h2>
        <h1 className={homeStyles.banner.amount}>₹ 120.00</h1>
        <div className={homeStyles.banner.subbanner}>
          {badges.map((badge, i) => (
            <div key={badge.name}>
              <div className={homeStyles.banner.badgeTitle}>
                {badge.element}
                <p className={homeStyles.banner.badgeName}>{badge.name}</p>
              </div>
              <h2 className={homeStyles.banner.badgeAmount(badge.color)}>
                ₹{spending[i].toFixed(2)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
