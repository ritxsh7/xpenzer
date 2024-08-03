import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { homeStyles } from "./styles";

const Banner = () => {
  const badges = [
    {
      name: "Personal expenses",
      color: "red",
    },
    {
      name: "Total lendings",
      color: "lime",
    },
  ];

  const spending = [80.0, 40.0];

  return (
    <div className="w-full my-10">
      <h1 className={homeStyles.banner.thisMonth}> This month</h1>
      <div className={homeStyles.banner.container}>
        <h2 className={homeStyles.banner.heading}>Total spendings</h2>
        <h1 className={homeStyles.banner.amount}>₹ 120.00</h1>
        <div className={homeStyles.banner.subbanner}>
          {badges.map((badge, i) => (
            <div
              className={homeStyles.banner.badge(badge.color)}
              key={badge.name}
            >
              <div className={homeStyles.banner.badgeTitle}>
                <TiArrowSortedDown />
                <p className={homeStyles.banner.badgeName}>{badge.name}</p>
              </div>
              <h2 className={homeStyles.banner.badgeAmount}>
                ₹ {spending[i].toFixed(2)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
