import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const NewFriendModal = ({ isOpen, onClose, onAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([]);

  console.log("contacts" in navigator);

  const handleAddFriend = (contact) => {
    onAddFriend(contact);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document
          .getElementById("modal-content")
          .classList.remove("translate-y-[-20rem]");
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start">
      <div
        id="modal-content"
        className="w-full max-w-md bg-[#121212] p-6 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-[-20rem]"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <IoMdClose
            className="text-2xl text-gray-400 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <h2 className="text-2xl text-white font-bold mb-4">Add New Friend</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 bg-[#333] text-white border-none rounded-md"
        />

        {/* Contacts List */}
        <div className="h-40 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 text-white bg-[#1E1E1E] rounded-md mb-2 hover:bg-[#333] cursor-pointer"
                onClick={() => handleAddFriend(contact)}
              >
                <div>
                  <p>{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
                <button className="text-[#5C6AF5]">Add</button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No contacts found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewFriendModal;
