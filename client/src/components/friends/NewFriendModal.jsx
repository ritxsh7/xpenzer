import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const NewFriendModal = ({ isOpen, setModalOpen, onAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleAddFriend = (contact) => {
    onAddFriend(contact);
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start`}
    >
      <div
        id="modal-content"
        className={`w-full fixed max-w-md  h-[90vh] bg-[#121212] p-6 rounded-lg shadow-lg transform transition-transform ease-in-out duration-1000 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } `}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <IoMdClose
            className="text-2xl text-gray-400 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>

        <h2 className="text-lg text-[#5c6af5] font-bold mb-4">
          Add a new friend
        </h2>

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
            <div className="text-center mt-8 text-gray-400">
              No contacts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewFriendModal;
