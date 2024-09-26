import SearchBar from "../components/friends/SearchBar";
import GroupList from "../components/groups/GroupList";
import Header from "../components/home/Header";
import styles from "../components/friends/styles";
import React, { useState } from "react";
import { SlPlus } from "react-icons/sl";
import NewGroupModal from "../components/groups/NewGroupModal";
import { useSelector } from "react-redux";

const GroupsPage = () => {
  /* GroupsPage comp here */

  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const { groups } = useSelector((store) => store.friends);

  const filteredGroups = groups.filter((g) =>
    g.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <Header />
      <h1 className="text-left text-xl font-bold my-4">Your groups</h1>
      <div className={styles.friendsPage.searchBar}>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          placeholder="Search your groups"
        />
        <div
          className={styles.friendsPage.icon}
          onClick={() => {
            setIsGroupModalOpen(true);
          }}
        >
          <SlPlus />
        </div>
      </div>
      <GroupList groups={filteredGroups} />
      <NewGroupModal
        isOpen={isGroupModalOpen}
        setModalOpen={setIsGroupModalOpen}
      />
    </div>
  );
};

export default GroupsPage;
