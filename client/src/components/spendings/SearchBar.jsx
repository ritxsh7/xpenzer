import React from "react";
import { RiUserSearchFill } from "react-icons/ri";
import { spendingStyles } from "./styles";

const SearchBar = ({ onFocus }) => {
  return (
    <>
      <p className={spendingStyles.searchBar.label}>Add contributors</p>
      <div className={spendingStyles.searchBar.container}>
        <span className={spendingStyles.searchBar.icon}>
          <RiUserSearchFill />
        </span>
        <input
          onFocus={() => onFocus(true)}
          onBlur={(e) =>
            setTimeout(() => {
              onFocus(false);
            }, 100)
          }
          type="text"
          placeholder="eg. Sanket"
          className={`${spendingStyles.form.input.field} outline-none`}
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
