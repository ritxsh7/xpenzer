import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.newFriend.searchBar.wrapper}>
      <FiSearch size={20} className={styles.newFriend.searchBar.icon} />
      <input
        type="text"
        placeholder="Search friends"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.newFriend.searchBar.input}
      />
    </div>
  );
};

export default SearchBar;
