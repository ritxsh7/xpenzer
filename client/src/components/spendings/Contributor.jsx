import React from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch } from "react-redux";
import { onChangeAmount } from "../../store/functions/spending.payload";

const Contributor = ({ contributor, showInput, index }) => {
  const dispatch = useDispatch();

  const onChangeUser = (e) => {};

  return (
    contributor && (
      <div className={spendingStyles.contributor.container(showInput)}>
        {contributor.isUser && (
          <input
            type="checkbox"
            className={spendingStyles.checkBox}
            onChange={(e) => onChangeUser(e)}
          />
        )}
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
    )
  );
};

export default Contributor;
