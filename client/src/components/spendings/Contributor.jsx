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

const Contributor = ({ contributor, showInput, index, list }) => {
  // Store

  const { contributors } = useSelector((store) => store.spendingPayload);
  const dispatch = useDispatch();

  const handleToggleContributor = (e) => {
    if (!e.target.checked) {
      dispatch(removeContributor(contributor.friend_id));
    }
    dispatch(splitAmountEqually());
  };

  return (
    (contributor.friend_id || showInput) && (
      <div className="flex gap-2 items-center">
        {showInput && (
          <input
            type="checkbox"
            className="custom-checkbox"
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
            <div className="flex w-[40%] ml-auto gap-2 items-center">
              <span className="text-sm">₹</span>
              <input
                type="text"
                required
                value={contributor.amount}
                className="w-full outline-none text-gray-400 text-sm p-2"
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
