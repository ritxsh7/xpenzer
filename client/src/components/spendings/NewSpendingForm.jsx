import React, { useRef, useState } from "react";
import { formatDateForInput } from "../../utils/date";
import InputGroup from "./InputGroup";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";

const NewSpendingForm = () => {
  const dateRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const friendRef = useRef(null);

  const [contributors, setContributors] = useState([]);
  console.log(contributors);

  const [friends, setFriends] = useState([
    { profile_color: "blue", username: "Balaji" },
    { profile_color: "green", username: "Shreyash" },
    { profile_color: "purple", username: "Rushi" },
    { profile_color: "orange", username: "Bhaiyya" },
  ]);
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
    <form className="bg-transparent  relative p-4 my-4 h-full">
      <InputGroup
        label="Amount"
        placeholder="XXXX"
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

      <button
        onClick={handleNewSpending}
        className="bg-[#5c6af5] mt-12 w-full p-4 rounded-md absolute bottom-4 right-0"
      >
        Continue
      </button>

      {showDropdown && (
        <ul className="w-full max-h-[200px] rounded-md px-4 overflow-y-scroll my-4 bg-[#121212]">
          {friends.map((friend, index) => (
            <FriendItem
              key={index}
              friend={friend}
              setContributors={setContributors}
            />
          ))}
        </ul>
      )}
    </form>
  );
};

export default NewSpendingForm;
