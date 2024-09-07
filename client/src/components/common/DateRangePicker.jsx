import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowsAltH } from "react-icons/fa";
import styles from "./styles";

const DateRangePicker = ({ dateRange, setDateRange }) => {
  /* DatePicker comp here */

  const handleDateRange = (e, where) => {
    if (where === "start") {
      setDateRange({
        ...dateRange,
        start: e,
      });
    } else {
      setDateRange({
        ...dateRange,
        end: e,
      });
    }
  };

  return (
    <div className={styles.dateRange.container}>
      <div className={styles.dateRange.wrapper}>
        <DatePicker
          selected={dateRange.start}
          onChange={(e) => handleDateRange(e, "start")}
          selectsStart
          startDate={dateRange.start}
          endDate={dateRange.end}
          dateFormat="MMM d, yy"
          className={styles.dateRange.input}
        />
        <span className={styles.dateRange.icon}>
          <FaArrowsAltH />
        </span>
        <DatePicker
          selected={dateRange.end}
          onChange={handleDateRange}
          selectsEnd
          startDate={dateRange.start}
          endDate={dateRange.end}
          dateFormat="MMM d, yy"
          className={styles.dateRange.input}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
