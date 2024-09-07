import { client } from "../client";

const spendingsEndpoints = {
  getAllSpendings: (page, dateRange) =>
    `/spendings/get-all?start=${dateRange.start}&end=${dateRange.end}&page=${page}`,
  getById: (id) => `/spendings/spending/${id}`,
  getSpendingsAmount: "/spendings/total",
  newSpending: "/spendings/spending/new",
};

export const spendingsApi = {
  getAllSpendings: async ({ limit, dateRange }) => {
    try {
      const res = await client.get(
        spendingsEndpoints.getAllSpendings(limit, dateRange)
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  getById: async ({ id }) => {
    try {
      const res = await client.get(spendingsEndpoints.getById(id));
      return res;
    } catch (error) {
      throw error;
    }
  },
  getTotalSpendings: async () => {
    try {
      const res = await client.get(spendingsEndpoints.getSpendingsAmount);
      return res;
    } catch (error) {
      throw error;
    }
  },
  newSpending: async (payload) => {
    try {
      const res = await client.post(spendingsEndpoints.newSpending, payload);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
