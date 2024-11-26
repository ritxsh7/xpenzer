import React, { useState, lazy, Suspense, useEffect } from "react";
import { spendingsApi } from "../api/modules/spendings";
import UserIcon from "../components/common/UserIcon";
import SwitchTab from "../components/home/SwitchTab";
import { defaultDateRange } from "../utils/date";
import CreateNewIcon from "../components/home/CreateNewIcon";
import { NavLink } from "react-router-dom";
import { homeStyles } from "../components/home/styles";
import DateRangePicker from "../components/common/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/functions/ux";
import { clearPayload } from "../store/functions/spending.payload";
import Banner from "../components/home/Banner";
import SpendingList from "../components/home/SpendingList";
import ExpenseList from "../components/home/ExpenseList";

const HomePage = () => {
  /* HomePage comp here */

  // Store
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // States
  const [activeTab, setActiveTab] = useState("spendings");
  const [spendings, setSpendings] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const [page, setPage] = useState(0);
  const { start, end } = defaultDateRange();

  const [dateRange, setDateRange] = useState({
    start,
    end,
  });

  // Fetch spendings
  useEffect(() => {
    const getAllSpendings = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await spendingsApi.getAllSpendings({
          limit: page,
          dateRange,
        });
        setSpendings(data[0]);
        setExpenses(data[1]);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAllSpendings();
  }, [dateRange, page]);

  return (
    <div className={homeStyles.container}>
      <UserIcon
        name={user.username}
        color={user.profile}
        text="Welcome back!"
      />
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <Banner />
      <SwitchTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "spendings" ? (
        <SpendingList spendings={spendings} />
      ) : (
        <ExpenseList expenses={expenses} />
      )}
      <NavLink to="/new-spending" onClick={() => dispatch(clearPayload())}>
        <CreateNewIcon />
      </NavLink>
    </div>
  );
};
export default HomePage;
