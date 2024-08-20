import React, { useState, lazy, Suspense } from "react";
import Header from "../components/home/Header";
import { spendingsApi } from "../api/modules/spendings";
import UserIcon from "../components/common/UserIcon";
import SwitchTab from "../components/home/SwitchTab";
import BannerSkeleton from "../components/skeletons/BannerSkeleton";
import ListItemSkeleton from "../components/skeletons/ListSkeleton";
import useFetch from "../hooks/useFetch";

const Banner = lazy(() => import("../components/home/Banner"));
const SpendingList = lazy(() => import("../components/home/SpendingList"));
const ExpenseList = lazy(() => import("../components/home/ExpenseList"));

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("spendings");
  const { response } = useFetch(spendingsApi.getAllSpendings);

  return (
    <div className="p-5 min-h-[100vh]">
      {response && (
        <>
          <Header />
          <UserIcon />
          <Suspense fallback={<BannerSkeleton />}>
            <Banner />
            <SwitchTab activeTab={activeTab} setActiveTab={setActiveTab} />
          </Suspense>
          {activeTab === "spendings" ? (
            <Suspense fallback={<ListItemSkeleton />}>
              <SpendingList spendings={response[0]} />
            </Suspense>
          ) : (
            <Suspense fallback={<ListItemSkeleton />}>
              <ExpenseList expenses={response[1]} />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};
export default HomePage;
