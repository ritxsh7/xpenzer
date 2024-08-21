import React, { useEffect, useRef, useState } from "react";
import { formatDateForInput } from "../../utils/date";
import InputGroup from "./InputGroup";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";
import Contributor from "./Contributor";
import { spendingStyles } from "./styles";
import useFetch from "../../hooks/useFetch";

import friendsApi from "../../api/modules/friends";

const NewSpendingForm = () => {
  const { response } = useFetch(friendsApi.getAllFriends);

  const dateRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  const [contributors, setContributors] = useState([]);
  const [contriAmount, setContriAmount] = useState(amountRef?.current?.value);

  useEffect(() => {
    setContriAmount(contributors.length / amountRef.current.value);
  }, [contriAmount, amountRef]);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleNewSpending = (e) => {
    e.preventDefault();
    console.log(dateRef.current.value);
    console.log(amountRef.current.value);
    console.log(descriptionRef.current.value);
  };

  const handleFocus = (value) => {
    setShowDropdown(value);
  };

  return (
    <form className={spendingStyles.form.container}>
      <InputGroup
        label="Amount"
        placeholder="₹ XXXX"
        type="text"
        state={amountRef}
      />
      <InputGroup
        state={descriptionRef}
        label="Description"
        placeholder="eg. food/travel/shopping"
        type="text"
      />
      <InputGroup
        label="Date"
        state={dateRef}
        type="date"
        defaultValue={formatDateForInput()}
      />
      <SearchBar onFocus={handleFocus} />

      {showDropdown && (
        <ul className={spendingStyles.form.dropdown}>
          <p className="text-left my-2 text-xs text-[#5C6AF5]">Your friends</p>
          {response &&
            response.map((friend) => (
              <FriendItem
                key={friend.friend_id}
                friend={friend}
                setContributors={setContributors}
                setShowDropdown={setShowDropdown}
                totalAmount={amountRef.current.value}
              />
            ))}
        </ul>
      )}
      {contributors.map((c) => (
        <Contributor contributor={c} key={c.friend_id} />
      ))}
      <button onClick={handleNewSpending} className={spendingStyles.button}>
        Continue
      </button>
    </form>
  );
};

export default NewSpendingForm;
