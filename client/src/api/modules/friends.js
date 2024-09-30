import { client } from "../client.js";

const friendsEndpoints = {
  getAll: "/friends/all",
  getFriendLike: (name) => `/friends?like=${name}`,
  getUsersLike: (name) => `/friends/users?like=${name}`,
  friendRequest: `/friends/friend-request`,
  getTransactions: (fid, start, end) =>
    `/friends/transactions?fid=${fid}&start=${start}&end=${end}`,
  settleBalance: `friends/settle-balance`,
  settleTransaction: "friends/settle-transaction",
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
  friendRequest: async (fid) => {
    try {
      const res = await client.post(friendsEndpoints.friendRequest, {
        id: fid,
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  getTransactions: async (fid, start, end) => {
    try {
      const res = await client.get(
        friendsEndpoints.getTransactions(fid, start, end)
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  settleBalance: async (fid) => {
    try {
      const res = await client.patch(friendsEndpoints.settleBalance, { fid });
      return res;
    } catch (error) {
      throw error;
    }
  },
  settleTransaction: async (fid, amount, contriId) => {
    try {
      const res = await client.put(friendsEndpoints.settleTransaction, {
        fid,
        amount,
        contriId,
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default friendsApi;
