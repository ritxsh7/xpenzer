import SearchBar from "../components/friends/SearchBar";
import GroupList from "../components/groups/GroupList";
import Header from "../components/home/Header";
import styles from "../components/friends/styles";
import React, { useState } from "react";
import { SlPlus } from "react-icons/sl";

const GroupsPage = () => {
  /* GroupsPage comp here */

  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    {
      id: 1,
      groupName: "Roommates",
      lastActivity: "1 day ago",
      avatarColor: "bg-blue-500",
    },
    {
      id: 2,
      groupName: "ICY",
      lastActivity: "3 days ago",
      avatarColor: "bg-red-500",
    },
  ];

  const filteredGroups = groups.filter((g) =>
    g.groupName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className={styles.friendsPage.icon} onClick={() => {}}>
          <SlPlus />
        </div>
      </div>
      <GroupList groups={filteredGroups} />
    </div>
  );
};

export default GroupsPage;
