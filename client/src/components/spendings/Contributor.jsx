import React, { useEffect } from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  changeContributorAmount,
  distributeAmount,
  splitAmountEqually,
  removeContributor,
} from "../../store/functions/spending.payload";
import { RxCross2 } from "react-icons/rx";

const Contributor = ({ contributor, showInput, index }) => {
  /* Contributor comp here */

  // Store
  const { contributors } = useSelector((store) => store.spendingPayload);
  const dispatch = useDispatch();

  // Handlers
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
            disabled={contributors.length === 1}
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
          {showInput ? (
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
          ) : (
            <RxCross2
              onClick={() => dispatch(removeContributor(contributor.friend_id))}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Contributor;
