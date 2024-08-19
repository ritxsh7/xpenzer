import { client } from "../client";

const spendingsEndpoints = {
  getAllSpendings: "/spendings/get-all",
  getThisMonthsSpendings: "/spendings/get-all?all=true",
  getById: (id) => `/spendings/spending/${id}`,
};

export const spendingsApi = {
  getAllSpendings: async (limit) => {
    try {
      const res = await client.get(
        limit
          ? spendingsEndpoints.getThisMonthsSpendings
          : spendingsEndpoints.getAllSpendings
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const res = await client.get(spendingsEndpoints.getById(id));
      return res;
    } catch (error) {
      throw error;
    }
  },
};