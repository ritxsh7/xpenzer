import React, { useState } from "react";
import { homeStyles } from "../home/styles";
import AvatarComp from "../common/Avatar";

const Contributor = ({ contributor, contriAmount }) => {
  const [amount, setAmount] = useState(contriAmount);

  return (
    contributor && (
      <div
        className={`${homeStyles.contributor.profile} p-2 my-4 bg-[#121212] rounded-md`}
      >
        <AvatarComp
          name={contributor.friend_name}
          color={contributor.profile_color}
        />
        <p>{contributor.friend_name} </p>
        <div className="flex ml-auto w-[30%] gap-3">
          <span>₹</span>
          <input
            type="text"
            required
            className="w-full outline-none text-gray-400"
            // value={amount}
            defaultValue={contributor.amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
      </div>
    )
  );
};

export default Contributor;
