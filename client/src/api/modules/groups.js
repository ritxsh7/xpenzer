import { client } from "../client";

const groupEndpoints = {
  createGroup: "/groups/new",
  getAll: "/groups/all",
  getExpenses: (id, page) => `/groups/group/chat?id=${id}&page=${page}`,
  getMembers: (id) => `/groups/group/members?id=${id}`,
};

export default {
  createGroup: async (payload) => {
    try {
      const res = await client.post(groupEndpoints.createGroup, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  getAllGroups: async () => {
    try {
      const res = await client.get(groupEndpoints.getAll);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  getGroupMembers: async (id) => {
    try {
      const res = await client.get(groupEndpoints.getMembers(id));
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  getGroupExpenses: async (id, page) => {
    try {
      const res = await client.get(groupEndpoints.getExpenses(id, page));
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
