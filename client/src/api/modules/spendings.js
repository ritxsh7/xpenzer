import { client } from "../client";

const spendingsEndpoints = {
  getAllSpendings: "/spendings/get-all",
};

export const spendingsApi = {
  getAllSpendings: async () => {
    try {
      const res = await client.get(spendingsEndpoints.getAllSpendings);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
