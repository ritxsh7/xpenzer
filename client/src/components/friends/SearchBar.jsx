import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder, fullWidth }) => {
  return (
    <div className={styles.newFriend.searchBar.wrapper(fullWidth)}>
      <FiSearch size={20} className={styles.newFriend.searchBar.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.newFriend.searchBar.input}
      />
    </div>
  );
};

export default SearchBar;
