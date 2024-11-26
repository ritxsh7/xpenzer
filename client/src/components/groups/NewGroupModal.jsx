import React, { useRef, useState } from "react";
import styles from "../friends/styles";
import { IoMdClose } from "react-icons/io";
import groupStyles from "./styles.js";
import SearchBar from "../friends/SearchBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import FriendCard from "../friends/FriendCard.jsx";
import groups from "../../api/modules/groups.js";
import { setLoading } from "../../store/functions/ux.js";
import { toast } from "react-toastify";

const NewGroupModal = ({ isOpen, setModalOpen }) => {
  /* NewGroupModal comp here */

  //store
  const { friends } = useSelector((store) => store.data);
  const [searchTerm, setSearchTerm] = useState("");
  const nameRef = useRef(null);

  // states
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  const filteredFriends = friends?.filter((friend) =>
    friend.friend_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //handlers
  const addMember = (friend) => {
    if (members.find((mem) => mem == friend)) {
      setMembers((members) => members.filter((f) => f != friend));
      return;
    }
    setMembers((members) => [...members, friend]);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const result = await groups.createGroup({
        groupName: nameRef.current.value,
        members,
      });
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setModalOpen(false);
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <form
      id="modal-content"
      className={styles.newFriend.wrapper(isOpen)}
      onSubmit={handleCreateGroup}
    >
      <div className={styles.newFriend.icon}>
        <IoMdClose
          className={styles.newFriend.iconCross}
          onClick={() => setModalOpen(false)}
        />
      </div>
      <h2 className={styles.newFriend.header}>Create a new group</h2>

      <input
        type="text"
        required
        ref={nameRef}
        className={groupStyles.input}
        placeholder="Group name"
      />

      <div className="my-8">
        <SearchBar
          placeholder="Add friends"
          fullWidth
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className={groupStyles.friendList}>
          {filteredFriends?.map((friend) => (
            <div
              onClick={() => addMember(friend.friend_id)}
              key={friend.friend_id}
            >
              <FriendCard
                friend={friend}
                forSearch
                added={members.find((mem) => mem == friend.friend_id)}
              />
            </div>
          ))}
        </div>
        <button className="bg-[#5c6af5] w-full p-3 rounded-md">
          Create group
        </button>
      </div>
    </form>
  );
};

export default NewGroupModal;
