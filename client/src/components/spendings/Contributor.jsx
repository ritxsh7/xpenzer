import React, { useEffect } from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsUser,
  changeContributorAmount,
  distributeAmount,
  splitAmountEqually,
  addContributor,
  removeContributor,
} from "../../store/functions/spending.payload";

const Contributor = ({ contributor, showInput, index }) => {
  // Store

  const dispatch = useDispatch();

  const handleToggleContributor = (e) => {
    if (!e.target.checked) {
      dispatch(removeContributor(contributor.friend_id));
    }
    dispatch(splitAmountEqually());
  };

  return (
    (contributor.friend_id || showInput) && (
      <div className={spendingStyles.contributor.wrapper}>
        {showInput && (
          <input
            type="checkbox"
            className={spendingStyles.contributor.checkbox}
            defaultChecked
            onChange={(contributor) => handleToggleContributor(contributor)}
          ></input>
        )}
        <div className={spendingStyles.contributor.container(showInput)}>
          <AvatarComp
            size={showInput ? "30" : "20"}
            name={contributor.friend_name}
            color={contributor.profile_color}
          />
          <p className="text-sm">
            {contributor.isUser ? "You" : contributor.friend_name}
          </p>
          {showInput && (
            <div className={spendingStyles.contributor.input}>
              <span className="text-sm">₹</span>
              <input
                type="text"
                required
                value={contributor.amount}
                className={spendingStyles.contributor.field}
                onChange={(e) => {
                  dispatch(
                    changeContributorAmount({ amount: e.target.value, index })
                  );
                  dispatch(distributeAmount({ amount: e.target.value, index }));
                }}
              ></input>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Contributor;
