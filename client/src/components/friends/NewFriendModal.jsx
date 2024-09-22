import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./styles";
import friendsApi from "../../api/modules/friends";
import AvatarComp from "../common/Avatar";

const NewFriendModal = ({ isOpen, setModalOpen, onAddFriend }) => {
  const [contacts, setContacts] = useState([]);

  const handleSearchContact = async (e) => {
    if (!e.target.value) return;
    try {
      const users = await friendsApi.getUsersLike(e.target.value);
      setContacts(users.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        type="tel"
        placeholder="Search by phone number"
        onChange={handleSearchContact}
        className={styles.newFriend.search}
      />

      {/* Contacts List */}
      <div className={styles.newFriend.contactList}>
        {contacts.length > 0 ? (
          contacts.map((contact, i) => (
            <div
              key={i}
              className={styles.newFriend.searchResult.wrapper}
              onClick={() => handleAddFriend(contact)}
            >
              <div className={styles.newFriend.left}>
                <AvatarComp
                  name={contact.username}
                  color={contact.profile_name}
                />
                <div className="text-left">
                  <p className="text-sm">{contact.username}</p>
                  <p className={styles.newFriend.searchResult.contact}>
                    {contact.phone}
                  </p>
                </div>
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
