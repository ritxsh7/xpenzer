import { client } from "../client";

const groupEndpoints = {
  createGroup: "/groups/new",
  getAll: "/groups/all",
  getDetails: (id) => `/groups/group?id=${id}`,
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
  getGroupDetails: async (id) => {
    try {
      const res = await client.get(groupEndpoints.getDetails(id));
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
