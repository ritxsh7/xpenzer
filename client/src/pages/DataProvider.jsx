import React from "react";
import useFetch from "../hooks/useFetch";
import friendsApi from "../api/modules/friends";
import groups from "../api/modules/groups";
import {
  setFriends,
  setGroups,
  setNotifications,
} from "../store/functions/data";

const DataProvider = ({ children }) => {
  //fetch friends
  useFetch(friendsApi.getAllFriends, [], setFriends);

  //fetch groups
  useFetch(groups.getAllGroups, [], setGroups);

  //fetch notis
  useFetch(groups.getAllNotifications, [], setNotifications);

  return <>{children}</>;
};

export default DataProvider;
