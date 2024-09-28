import React, { useState } from "react";
import AvatarComp from "../common/Avatar";
import { useSelector } from "react-redux";
import ContributorList from "../home/ContributorList";
import groupStyles from "./styles";

const ExpenseItem = ({ expense }) => {
  /* ExpenseItem comp here */

  //store
  const { user } = useSelector((store) => store.user);

  const [showContributors, setShowContributors] = useState(false);

  return (
    <div className={groupStyles.chat.item(user.userId == expense.user_id)}>
      {user.userId != expense.user_id && (
        <div className={groupStyles.chat.profile}>
          <AvatarComp
            name={expense.username}
            color={expense.profile_color}
            size="20"
          />
          <p>{expense.username}</p>
        </div>
      )}
      <div className={groupStyles.chat.details(user.userId == expense.user_id)}>
        <p className="text-xs">Expense for '{expense.description}'</p>
        <p className="text-2xl">₹{expense.amount}</p>
        <button
          className={groupStyles.chat.button}
          onClick={() => setShowContributors(!showContributors)}
        >
          {`${showContributors ? "Hide" : "Show"} contributors`}
        </button>
        <ContributorList
          id={expense.spending_id}
          open={showContributors}
          inChat
        />
      </div>
    </div>
  );
};

export default ExpenseItem;
