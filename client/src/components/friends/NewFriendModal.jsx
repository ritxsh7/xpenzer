import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./styles";
import friendsApi from "../../api/modules/friends";
import AvatarComp from "../common/Avatar";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/functions/ux";
import { toast } from "react-toastify";

const NewFriendModal = ({ isOpen, setModalOpen }) => {
  /* NewFriendModal here */

  //stores
  const dispatch = useDispatch();

  //states
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

  const handleAddFriend = async (contact) => {
    try {
      dispatch(setLoading(true));
      const response = await friendsApi.friendRequest(contact.user_id);
      toast.success(response.message);
      setModalOpen(false);
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
      // window.location.reload();
    }
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

      <h2 className={styles.newFriend.header}>Add a friend</h2>

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
            <div key={i} className={styles.newFriend.searchResult.wrapper}>
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
              <button
                className={styles.newFriend.searchResult.button}
                onClick={() => handleAddFriend(contact)}
              >
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
