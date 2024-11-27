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
import ListSkeleton from "../components/skeletons/ListSkeleton";
import BannerSkeleton from "../components/skeletons/BannerSkeleton";

const FriendsPage = () => {
  /*Friendspage comp here */

  //stores
  const { friends, lendings, borrowings } = useSelector((store) => store.data);

  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  //search friend
  const filteredFriends = friends?.filter((friend) =>
    friend.friend_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModelOpen = () => {
    setModalOpen(true);
  };

  if (!friends) {
    return (
      <>
        <BannerSkeleton />
        <ListSkeleton />
      </>
    );
  }

  return (
    <div>
      <div className={styles.friendsPage.wrapper}>
        {/* stats */}
        <div className={styles.friendsPage.stats}>
          <StatsCard
            color="bg-lime-600"
            score={Number(lendings * -1)}
            name="Lendings"
            up
          />
          <StatsCard
            color="bg-red-600"
            score={Number(borrowings)}
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
          {filteredFriends.length === 0 ? (
            <p>No friends found</p>
          ) : (
            filteredFriends.map((friend) => (
              <NavLink
                to={`/friends/transactions/${friend.friend_id}`}
                key={friend.friend_id}
              >
                <FriendCard friend={friend} />
              </NavLink>
            ))
          )}
        </div>
      </div>

      <NewFriendModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default FriendsPage;
