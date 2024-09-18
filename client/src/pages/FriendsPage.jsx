import React from "react";
import Header from "../components/home/Header";
import { useState } from "react";
import SearchBar from "../components/friends/SearchBar";
import { IoMdPersonAdd } from "react-icons/io";
import StatsCard from "../components/friends/StatsCard";
import FriendCard from "../components/friends/FriendCard";
import NewFriendModal from "../components/friends/NewFriendModal";

const FriendsPage = () => {
  /*Friendspage comp here */

  const [searchTerm, setSearchTerm] = useState("");

  const [friends, setFriends] = useState([
    { id: 1, name: "John Doe", balance: 200.0 },
    { id: 2, name: "Jane Smith", balance: -50.0 },
    { id: 3, name: "Sam Wilson", balance: 0.0 },
  ]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [newFriend, setNewFriend] = useState({
    name: "",
    balance: 0,
    avatar: "",
  });

  return (
    <div className="p-5">
      <Header />
      <div className=" text-white bg-black min-h-screen">
        <div className="flex justify-between">
          <StatsCard color="bg-lime-600" score={30} name="Lendings" />
          <StatsCard color="bg-red-600" score={10} name="Borrowed" />
        </div>

        <div className="flex items-center h-[3rem] my-2 gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="text-2xl" onClick={() => setModalOpen(true)}>
            <IoMdPersonAdd />
          </div>
        </div>

        {/* Friends List */}
        <div>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => <FriendCard {...friend} />)
          ) : (
            <div className="text-center text-gray-400">No friends found</div>
          )}
        </div>
      </div>
      <NewFriendModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default FriendsPage;
