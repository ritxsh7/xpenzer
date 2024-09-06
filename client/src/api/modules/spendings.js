import { client } from "../client";

const spendingsEndpoints = {
  getAllSpendings: (page) => `/spendings/get-all?page=${page}`,
  getThisMonthsSpendings: "/spendings/get-all?all=true",
  getById: (id) => `/spendings/spending/${id}`,
  getSpendingsAmount: "/spendings/total",
  newSpending: "/spendings/spending/new",
};

export const spendingsApi = {
<<<<<<< HEAD
  getAllSpendings: async ({ page }) => {
    try {
      const res = await client.get(spendingsEndpoints.getAllSpendings(page));
=======
  getAllSpendings: async ({ limit }) => {
    try {
      const res = await client.get(spendingsEndpoints.getAllSpendings(limit));
>>>>>>> 722bbec2e1f819fd7cb90ef2f591af633d25772a
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
