import React from "react";
import Header from "../components/home/Header";
import { useState } from "react";
import SearchBar from "../components/friends/SearchBar";
import { FiPlus } from "react-icons/fi";
import StatsCard from "../components/friends/StatsCard";

const FriendsPage = () => {
  /*Friendspage comp here */

  const [searchTerm, setSearchTerm] = useState("");

  const [friends, setFriends] = useState([
    { id: 1, name: "John Doe", balance: 200.0, avatar: "JD" },
    { id: 2, name: "Jane Smith", balance: -50.0, avatar: "JS" },
    { id: 3, name: "Sam Wilson", balance: 0.0, avatar: "SW" },
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

  // Function to handle adding a new friend
  const addNewFriend = () => {
    if (newFriend.name.trim()) {
      setFriends([
        ...friends,
        {
          id: friends.length + 1,
          name: newFriend.name,
          balance: parseFloat(newFriend.balance) || 0,
          avatar: newFriend.avatar || newFriend.name.slice(0, 2).toUpperCase(),
        },
      ]);
      setNewFriend({ name: "", balance: 0, avatar: "" }); // Reset form
      setModalOpen(false); // Close modal
    } else {
      alert("Friend's name cannot be empty.");
    }
  };

  return (
    <div className="p-5">
      <Header />
      <div className="p-4 text-white bg-black min-h-screen">
        {/* Search Bar */}
        <div>
          <StatsCard color="bg-blue-600" />
          <StatsCard color="bg-lime-600" />
          <StatsCard color="bg-red-600" />
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Friends List */}
        <div>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-4 mb-2 bg-[#1f1f1f] rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="bg-gray-600 rounded-full h-10 w-10 flex items-center justify-center text-white text-lg mr-3">
                    {friend.avatar}
                  </div>
                  {/* Name */}
                  <span className="font-semibold">{friend.name}</span>
                </div>
                {/* Balance */}
                <div
                  className={`text-sm ${
                    friend.balance < 0
                      ? "text-red-500"
                      : friend.balance > 0
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  ₹{friend.balance.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No friends found</div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4">Add New Friend</h2>
            <input
              type="text"
              placeholder="Friend's Name"
              value={newFriend.name}
              onChange={(e) =>
                setNewFriend({ ...newFriend, name: e.target.value })
              }
              className="w-full bg-[#1f1f1f] text-white py-2 px-4 mb-4 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Balance (₹)"
              value={newFriend.balance}
              onChange={(e) =>
                setNewFriend({ ...newFriend, balance: e.target.value })
              }
              className="w-full bg-[#1f1f1f] text-white py-2 px-4 mb-4 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Avatar (Optional)"
              value={newFriend.avatar}
              onChange={(e) =>
                setNewFriend({ ...newFriend, avatar: e.target.value })
              }
              className="w-full bg-[#1f1f1f] text-white py-2 px-4 mb-4 rounded-lg focus:outline-none"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addNewFriend}
                className="bg-green-500 py-2 px-4 rounded-lg"
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
