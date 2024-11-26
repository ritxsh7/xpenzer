import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { homeStyles } from "./styles";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch.js";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const Banner = ({ total }) => {
  /* Banner comp here */

  //Badges

  let amounts = [total.expenses, 100];

  return (
    <div className={homeStyles.banner.container}>
      <div className={homeStyles.banner.section}>
        <h2 className={homeStyles.banner.heading}>Your all spendings</h2>
        <h1 className={homeStyles.banner.amount("red")}>
          ₹<CountUp start={0} end={total.spendings} duration={1} />
        </h1>
      </div>
      <div className={homeStyles.banner.section}>
        <h2 className={homeStyles.banner.heading}>Your own expenses</h2>
        <h1 className={homeStyles.banner.amount()}>
          ₹<CountUp start={0} end={total.expenses} duration={1} />
        </h1>
      </div>
    </div>
  );
};

export default Banner;
