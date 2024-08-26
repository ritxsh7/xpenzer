import { client } from "../client.js";

const friendsEndpoints = {
  getAll: "/friends/all",
  getFriendLike: (name) => `/friends?like=${name}`,
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
};

export default friendsApi;
