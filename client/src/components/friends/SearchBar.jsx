import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-6">
      <FiSearch size={20} className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search friends"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#121212] text-white py-2 px-10 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
