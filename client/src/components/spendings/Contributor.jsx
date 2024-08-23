import React from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch } from "react-redux";
import {
  handleToggleUser,
  onChangeAmount,
  splitAmountEqually,
} from "../../store/functions/spending.payload";

const Contributor = ({ contributor, showInput, index }) => {
  // Store

  const dispatch = useDispatch();

  const onChangeUser = (e) => {
    dispatch(handleToggleUser(e.target.checked));
    dispatch(splitAmountEqually());
  };

  return (
    contributor && (
      <div>
        <div className={spendingStyles.contributor.container(showInput)}>
          <AvatarComp
            size={"20"}
            name={contributor.friend_name}
            color={contributor.profile_color}
          />
          <p className="text-sm">
            {contributor.isUser ? "You" : contributor.friend_name}
          </p>
          {showInput && (
            <div className="flex ml-auto w-[30%] gap-3">
              <span>₹</span>
              <input
                type="text"
                required
                value={contributor.amount}
                className="w-full outline-none text-gray-400"
                onChange={(e) =>
                  dispatch(onChangeAmount({ amount: e.target.value, index }))
                }
              ></input>
            </div>
          )}
        </div>
        {contributor.isUser && (
          <div className="flex my-2 mb-8 w-full items-center justify-center gap-2">
            <input
              type="checkbox"
              className={spendingStyles.checkBox}
              defaultChecked
              onChange={(e) => onChangeUser(e)}
            />
            <p className="text-xs">Include me in this spending</p>
          </div>
        )}
      </div>
    )
  );
};

export default Contributor;
