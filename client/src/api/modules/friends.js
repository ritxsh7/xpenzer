import { client } from "../client.js";

const friendsEndpoints = {
  getAll: "/friends/all",
  getFriendLike: (name) => `/friends?like=${name}`,
  getUsersLike: (name) => `/friends/users?like=${name}`,
  newFriend: (fid) => `/friends/new?fid=${fid}`,
};

const friendsApi = {
  getAllFriends: async () => {
    try {
      const res = await client.get(friendsEndpoints.getAll);
      return res;
    } catch (error) {
      throw error;
    }
  },
  getFriendLike: async (name) => {
    try {
      const res = await client.get(friendsEndpoints.getFriendLike(name));
      return res;
    } catch (error) {
      throw error;
    }
  },
  getUsersLike: async (name) => {
    try {
      const res = await client.get(friendsEndpoints.getUsersLike(name));
      return res;
    } catch (error) {
      throw error;
    }
  },
  newFriend: async (fid) => {
    try {
      const res = await client.post(friendsEndpoints.newFriend(fid));
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default friendsApi;
