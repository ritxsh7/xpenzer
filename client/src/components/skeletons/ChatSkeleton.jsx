import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col mt-10 gap-4 p-2">
      {Array(4)
        .fill()
        .map((_, i) => (
          <div className="w-full skeleton h-[10vh]" key={i}></div>
        ))}
    </div>
  );
};

export default ChatSkeleton;
