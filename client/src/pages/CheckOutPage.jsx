import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  preparePayload,
  setSpendingAmount,
  splitAmountEqually,
} from "../store/functions/spending.payload";
import Contributor from "../components/spendings/Contributor";
import { homeStyles } from "../components/home/styles";
import { spendingStyles } from "../components/spendings/styles";
import { spendingsApi } from "../api/modules/spendings";
import { setLoading } from "../store/functions/ux";
import { useNavigate } from "react-router-dom";
import { prepareSpendingPayload } from "../utils/payload";

const CheckOutPage = () => {
  // Store

  const spendingPayload = useSelector((store) => store.spendingPayload);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handlers
  const handleNewSpending = async () => {
    const contributorsPayload = prepareSpendingPayload(
      spendingPayload.contributors
    );
    const payload = {
      amount: spendingPayload.amount,
      description: spendingPayload.description,
      date: spendingPayload.date,
      contributors: contributorsPayload,
    };
    console.log(payload);
  };
  return (
    <div className="p-5 flex flex-col items-center h-svh">
      <Header />
      <div className="flex flex-col items-center relative min-h-[90vh]">
        <h2 className="mt-8 text-lg text-[#5c6af5]">Total Amount</h2>
        <div className="flex my-4 flex-col items-center justify-center">
          <span className="text-2xl">₹</span>
          <input
            maxLength="10"
            className="w-[50%] max-w-full h-[3rem] bg-transparent outline-none mx-2 px-2 text-center text-3xl"
            defaultValue={spendingPayload.amount}
            onChange={(e) => {
              dispatch(setSpendingAmount(e.target.value));
              dispatch(splitAmountEqually());
            }}
          ></input>
        </div>
        <div className="text-sm bg-[#121212] w-[50%] p-2 mb-8 rounded-md">
          {spendingPayload.description}
        </div>
        <div>
          {spendingPayload.contributors.map((contributor, i) => (
            <Contributor
              key={contributor?.friend_name}
              contributor={contributor}
              showInput
              index={i}
            />
          ))}
        </div>
        <button
          className={`${spendingStyles.button} absolute bottom-0 my-0`}
          onClick={handleNewSpending}
        >
          Add a spending
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
