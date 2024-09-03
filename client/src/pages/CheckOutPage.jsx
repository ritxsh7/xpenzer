import React from "react";
import Header from "../components/home/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  setSpendingAmount,
  splitAmountEqually,
} from "../store/functions/spending.payload";
import Contributor from "../components/spendings/Contributor";
import { spendingStyles } from "../components/spendings/styles";
import { useNavigate } from "react-router-dom";
import { prepareSpendingPayload } from "../utils/payload";
import { ToastContainer, toast } from "react-toastify";
import toasts from "../utils/toasts";
import { spendingsApi } from "../api/modules/spendings";
import { setLoading } from "../store/functions/ux";
import Drawer from "../components/common/Drawer";

const CheckOutPage = () => {
  /* CheckoutPage comp here */

  // Store
  const spendingPayload = useSelector((store) => store.spendingPayload);
  const dispatch = useDispatch();

  // Navigator
  const navigate = useNavigate();

  // Handlers
  const handleNewSpending = async () => {
    const contributorsPayload = prepareSpendingPayload(
      spendingPayload.contributors
    );

    if (contributorsPayload.total === Number(spendingPayload.amount)) {
      const payload = {
        amount: spendingPayload.amount,
        description: spendingPayload.description,
        date: spendingPayload.date,
        contributors: contributorsPayload,
      };
      try {
        dispatch(setLoading(true));
        const result = await spendingsApi.newSpending(payload);
      } catch (error) {
        toast.error(error.message);
      } finally {
        localStorage.removeItem("payload");
        dispatch(setLoading(false));
        navigate("/");
        window.location.reload();
      }
    } else {
      toast.warn(
        "Distribution exceeds total amount of " + spendingPayload.amount,
        toasts.warning
      );
      dispatch(splitAmountEqually());
    }
  };

  return (
    <div className={spendingStyles.checkoutPage.container}>
      <Header />
      <div className={spendingStyles.checkoutPage.summary}>
        <h2 className={spendingStyles.checkoutPage.amount}>Total Amount</h2>
        <div className={spendingStyles.checkoutPage.amountEdit}>
          <span className="text-2xl">₹</span>
          <input
            maxLength="10"
            className={spendingStyles.checkoutPage.amountInput}
            defaultValue={spendingPayload.amount}
            onChange={(e) => {
              dispatch(setSpendingAmount(e.target.value));
              dispatch(splitAmountEqually());
            }}
          ></input>
        </div>
        <div className={spendingStyles.checkoutPage.description}>
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
          className={`${spendingStyles.button} absolute bottom-8 my-0`}
          onClick={handleNewSpending}
        >
          Add spending
        </button>
      </div>
      <ToastContainer style={toasts.style} />
    </div>
  );
};

export default CheckOutPage;
