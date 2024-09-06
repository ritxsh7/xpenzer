import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";
import { FaArrowsAltH } from "react-icons/fa";
import { defaultDateRange } from "../../utils/date";

const DateRangePicker = () => {
  /* DatePicker comp here */

  const style =
    "bg-transparent border-b-[1px] border-[#aaaaa] p-2 text-xs w-[5rem] outline-none text-white";

  const { start, end } = defaultDateRange();
  console.log(start, end);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-left my-6">
      <p className="text-left text-[#5C6AF5] text-xs">Filter by Date Range</p>
      <div className="flex justify-between items-center rounded-md w-[100px]">
        <DatePicker
          selected={start}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={start}
          endDate={end}
          dateFormat="MMM d, yy"
          className={style}
        />
        <span className="text-sm text-white" onClick={() => setIsOpen(true)}>
          <FaArrowsAltH />
        </span>
        <DatePicker
          selected={end}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={start}
          endDate={end}
          dateFormat="MMM d, yy"
          className={style}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
