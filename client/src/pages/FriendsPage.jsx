import React from "react";
import Header from "../components/home/Header";
import { useState } from "react";
import SearchBar from "../components/friends/SearchBar";
import { IoMdPersonAdd } from "react-icons/io";
import StatsCard from "../components/friends/StatsCard";
import FriendCard from "../components/friends/FriendCard";
import NewFriendModal from "../components/friends/NewFriendModal";
import styles from "../components/friends/styles";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const FriendsPage = () => {
  /*Friendspage comp here */

  //stores
  const friends = useSelector((store) => store.friends);

  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  //search friend
  const filteredFriends = friends.friends.filter((friend) =>
    friend.friend_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModelOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-5">
      <Header />

      <div className={styles.friendsPage.wrapper}>
        {/* stats */}
        <div className={styles.friendsPage.stats}>
          <StatsCard
            color="bg-lime-600"
            score={Number(friends.lendings * -1)}
            name="Lendings"
            up
          />
          <StatsCard
            color="bg-red-600"
            score={Number(friends.borrowings)}
            name="Borrowed"
          />
        </div>

        {/* searchbar */}
        <div className={styles.friendsPage.searchBar}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search friends"
          />
          <div className={styles.friendsPage.icon} onClick={handleModelOpen}>
            <IoMdPersonAdd />
          </div>
        </div>

        {/* friends list */}
        <div>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <NavLink
                to={`/friends/transactions/${friend.friend_id}`}
                key={friend.friend_id}
              >
                <FriendCard friend={friend} />
              </NavLink>
            ))
          ) : (
            <div className={styles.friendsPage.message}>No friends found</div>
          )}
        </div>
      </div>

      <NewFriendModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default FriendsPage;
