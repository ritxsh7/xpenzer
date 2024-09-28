import React, { useState } from "react";
import AvatarComp from "../common/Avatar";
import { useSelector } from "react-redux";
import ContributorList from "../home/ContributorList";

const ExpenseItem = ({ expense }) => {
  /* ExpenseItem comp here */

  //store
  const { user } = useSelector((store) => store.user);

  const [showContributors, setShowContributors] = useState(false);

  return (
    <div
      className={`p-2 rounded-md w-[80%] relative ${
        user.userId == expense.user_id ? "ml-auto" : "ml-0"
      } `}
    >
      {user.userId != expense.user_id && (
        <div className="flex text-xs items-center gap-2">
          <AvatarComp
            name={expense.username}
            color={expense.profile_color}
            size="20"
          />
          <p>{expense.username}</p>
        </div>
      )}
      <div
        className={`text-left mt-1 bg-[#121212] p-3 rounded-md ${
          user.userId == expense.user_id && "bg-blue-950"
        }`}
      >
        <p className="text-xs">Expense for '{expense.description}'</p>
        <p className="text-2xl">₹{expense.amount}</p>
        <button
          className="text-sm mt-3 text-blue-500"
          onClick={() => setShowContributors(!showContributors)}
        >
          Show contributors
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
