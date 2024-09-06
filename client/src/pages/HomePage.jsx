import React, { useState, lazy, Suspense, useEffect } from "react";
import Header from "../components/home/Header";
import { spendingsApi } from "../api/modules/spendings";
import UserIcon from "../components/common/UserIcon";
import SwitchTab from "../components/home/SwitchTab";
import BannerSkeleton from "../components/skeletons/BannerSkeleton";
import ListItemSkeleton from "../components/skeletons/ListSkeleton";
import useFetch from "../hooks/useFetch";
import CreateNewIcon from "../components/home/CreateNewIcon";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
=======
import Drawer from "../components/common/Drawer";
import { homeStyles } from "../components/home/styles";
>>>>>>> 722bbec2e1f819fd7cb90ef2f591af633d25772a

// Lazy imports
const Banner = lazy(() => import("../components/home/Banner"));
const SpendingList = lazy(() => import("../components/home/SpendingList"));
const ExpenseList = lazy(() => import("../components/home/ExpenseList"));

const HomePage = () => {
  /* HomePage comp here */

  // States
  const [page, setPage] = useState(2);
  const [activeTab, setActiveTab] = useState("spendings");
  const [spendings, setSpendings] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetch spendings
  // const { response } = useFetch(spendingsApi.getAllSpendings, { limit: page });

  // useEffect(() => {
  //   if (response) {
  //     setSpendings(response[0]);
  //     setExpenses(response[1]);
  //   }
  // }, [response]);

  return (
    <div className={homeStyles.container}>
      {true && (
        <>
          <Header />
          <UserIcon />
          <Suspense fallback={<BannerSkeleton />}>
            <Banner />
            <SwitchTab activeTab={activeTab} setActiveTab={setActiveTab} />
          </Suspense>
          {activeTab === "spendings" ? (
            <Suspense fallback={<ListItemSkeleton />}>
              <SpendingList spendings={spendings} />
            </Suspense>
          ) : (
            <Suspense fallback={<ListItemSkeleton />}>
              <ExpenseList expenses={expenses} />
            </Suspense>
          )}
          {/* <button onClick={() => setPage(2)}>Next 5</button> */}
          <NavLink to="/new-spending">
            <CreateNewIcon />
          </NavLink>
        </>
      )}
    </div>
  );
};
export default HomePage;
