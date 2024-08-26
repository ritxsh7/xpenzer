import React, { useEffect, useRef, useState } from "react";
import { formatDateForInput } from "../../utils/date";
import InputGroup from "./InputGroup";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";
import Contributor from "./Contributor";
import { spendingStyles } from "./styles";
import useFetch from "../../hooks/useFetch";

import friendsApi from "../../api/modules/friends";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addContributor,
  savePayload,
  setRefPayload,
  splitAmountEqually,
} from "../../store/functions/spending.payload";

const NewSpendingForm = () => {
  // States

  const dateRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const isUserPresentRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Store
  const spendingPayload = useSelector((store) => store.spendingPayload);
  const {
    user: { username },
  } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { response } = useFetch(friendsApi.getAllFriends);

  const handleNewSpending = (e) => {
    e.preventDefault();
    const payload = {
      date: dateRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
    };
    dispatch(setRefPayload(payload));
    dispatch(
      addContributor({ friend_name: username, amount: 0, isUser: true })
    );
    dispatch(splitAmountEqually());
    dispatch(savePayload(payload));

    navigate("/new-spending/checkout");
  };

  const handleFocus = (value) => {
    setShowDropdown(value);
  };

  return (
    <form
      className={spendingStyles.form.container}
      onSubmit={handleNewSpending}
    >
      <InputGroup
        label="Amount"
        placeholder="₹ XXXX"
        type="text"
        state={amountRef}
        defaultValue={spendingPayload.amount}
      />
      <InputGroup
        state={descriptionRef}
        label="Description"
        placeholder="eg. food/travel/shopping"
        type="text"
        defaultValue={spendingPayload.description}
      />
      <InputGroup
        label="Date"
        state={dateRef}
        type="date"
        defaultValue={spendingPayload.date || formatDateForInput()}
      />

      <SearchBar onFocus={handleFocus} />

      {showDropdown && (
        <ul className={spendingStyles.form.dropdown}>
          <p className={spendingStyles.searchBar.label}>Your friends</p>
          {response &&
            response.map((friend) => (
              <FriendItem
                key={friend.friend_id}
                friend={friend}
                setShowDropdown={setShowDropdown}
              />
            ))}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-2 my-2">
        {spendingPayload.contributors.map((c) => (
          <Contributor contributor={c} key={c.friend_id || new Date()} />
        ))}
      </div>

      <button className={spendingStyles.button}>Continue</button>
    </form>
  );
};

export default NewSpendingForm;
