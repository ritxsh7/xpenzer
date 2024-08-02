import { client } from "../client";

const authEndpoints = {
  login: "/users/login",
  signup: "/users/signup",
  autoLogin: "/users/auth",
};

export const authApi = {
  login: async (auth) => {
    try {
      const res = await client.post(authEndpoints.login, auth);
      return res;
    } catch (error) {
      throw error;
    }
  },
  autoLogin: async (auth) => {
    try {
      const res = await client.get(authEndpoints.autoLogin);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
