import React from "react";
import AvatarComp from "../common/Avatar";
import { spendingStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsUser,
  changeContributorAmount,
  distributeAmount,
} from "../../store/functions/spending.payload";

const Contributor = ({ contributor, showInput, index, list }) => {
  // Store

  const { contributors } = useSelector((store) => store.spendingPayload);
  const dispatch = useDispatch();

  const onChangeUser = (e) => {
    if (contributors.length === 0) return;
    dispatch(changeIsUser(e.target.checked));
  };

  return (
    (contributor.friend_name || list) && (
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
              <span className="text-sm">₹</span>
              <input
                type="text"
                required
                value={contributor.amount}
                className="w-full outline-none text-gray-400 text-sm"
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
        {/* {contributor.isUser && (
          <div className="flex my-2 mb-8 w-full items-center justify-center gap-2">
            <input
              type="checkbox"
              className={spendingStyles.checkBox}
              defaultChecked
              disabled={contributors.length === 0}
              onChange={(e) => onChangeUser(e)}
            />
            <p className="text-xs">Include me in this spending</p>
          </div>
        )} */}
      </div>
    )
  );
};

export default Contributor;
