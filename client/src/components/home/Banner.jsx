import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { homeStyles } from "./styles";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch.js";
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
  const { response } = useFetch(spendingsApi.getTotalSpendings);

  return (
    <div className={homeStyles.banner.container}>
      <h2 className={homeStyles.banner.heading}>Total spendings</h2>
      <h1 className={homeStyles.banner.amount}>
        ₹
        {response
          ? (
              Number(response[0].total_spendings) +
              Number(response[1].total_spendings)
            ).toFixed(2)
          : "0"}
      </h1>
      <div className={homeStyles.banner.subbanner}>
        {badges.map((badge, i) => (
          <div key={badge.name}>
            <div className={homeStyles.banner.badgeTitle}>
              {badge.element}
              <p className={homeStyles.banner.badgeName}>{badge.name}</p>
            </div>
            <h2 className={homeStyles.banner.badgeAmount(badge.color)}>
              ₹{response ? response[i].total_spendings : "0"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
