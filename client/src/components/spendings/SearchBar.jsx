import React from "react";
import { RiUserSearchFill } from "react-icons/ri";

const SearchBar = ({ onFocus }) => {
  return (
    <>
      <p className="text-lg text-[#5C6AF5] my-4 text-left">Add contributors</p>
      <div className="flex bg-[#121212] items-center px-2 rounded-md">
        <span className="text-xl text-gray-400">
          <RiUserSearchFill />
        </span>
        <input
          onFocus={() => onFocus(true)}
          //   onBlur={() => onFocus(false)}
          type="text"
          placeholder="eg. Sanket"
          className="p-4 rounded-md w-full text-lg outline-none"
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
