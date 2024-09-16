import React from "react";
import AvatarComp from "../common/Avatar";

const FriendCard = (friend) => {
  return (
    <div
      key={friend.id}
      className="flex items-center justify-between p-3 mb-3  bg-[#1f1f1f] rounded-lg shadow-md"
    >
      <div className="flex items-center justify-between">
        <AvatarComp name={friend.name} />
        <p className="ml-3 text-sm">{friend.name}</p>
      </div>
      <div
        className={`text-sm font-semibold ${
          friend.balance < 0
            ? "text-red-600"
            : friend.balance > 0
            ? "text-lime-600"
            : "text-gray-400"
        }`}
      >
        <span>{friend.balance < 0 ? "-" : friend.balance > 0 ? "+" : ""}</span>{" "}
        ₹{Math.abs(friend.balance).toFixed(2)}
      </div>
    </div>
  );
};

export default FriendCard;
