import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { homeStyles } from "./styles";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch.js";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";

// RangePicker
const { RangePicker } = DatePicker;

const Banner = () => {
  /* Banner comp here */

  //Badges
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

  // Get response
  const { response } = useFetch(spendingsApi.getTotalSpendings);

  // store
  const { lendings } = useSelector((store) => store.friends);

  // Set banner data
  if (response) {
    var total = response[0].total_spendings;
    var personal = response[1].total_spendings;
  }
  let amounts = [personal, lendings * -1];

  return (
    <div className={homeStyles.banner.container}>
      <h2 className={homeStyles.banner.heading}>Total spendings</h2>
      <h1 className={homeStyles.banner.amount}>₹{response ? total : "0"}</h1>
      <div className={homeStyles.banner.subbanner}>
        {badges.map((badge, i) => (
          <div key={badge.name}>
            <div className={homeStyles.banner.badgeTitle}>
              {badge.element}
              <p className={homeStyles.banner.badgeName}>{badge.name}</p>
            </div>
            <h2 className={homeStyles.banner.badgeAmount(badge.color)}>
              ₹{response ? Number(amounts[i]).toFixed(2) : "0"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
