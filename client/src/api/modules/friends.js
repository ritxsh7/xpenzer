import { client } from "../client.js";

const friendsEndpoints = {
  getAll: "/friends/all",
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
};

export default friendsApi;
