import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./styles";

const NewFriendModal = ({ isOpen, setModalOpen, onAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleAddFriend = (contact) => {
    onAddFriend(contact);
    onClose();
  };

  return (
    <div id="modal-content" className={styles.newFriend.wrapper(isOpen)}>
      {/* Close button */}
      <div className={styles.newFriend.icon}>
        <IoMdClose
          className={styles.newFriend.iconCross}
          onClick={() => setModalOpen(false)}
        />
      </div>

      <h2 className={styles.newFriend.header}>Search users</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.newFriend.search}
      />

      {/* Contacts List */}
      <div className={styles.newFriend.contactList}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, i) => (
            <div
              key={i}
              className={styles.newFriend.searchResult.wrapper}
              onClick={() => handleAddFriend(contact)}
            >
              <div>
                <p>{contact.name}</p>
                <p className={styles.newFriend.searchResult.contact}>
                  {contact.phone}
                </p>
              </div>
              <button className={styles.newFriend.searchResult.button}>
                Add
              </button>
            </div>
          ))
        ) : (
          <div className={styles.newFriend.searchResult.message}>
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFriendModal;
