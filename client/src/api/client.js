import axios from "axios";
import queryString from "query-string";
import { setupCache } from "axios-cache-interceptor";

// CLIENT REQUEST CONFIG
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

export const client = setupCache(api);

client.interceptors.request.use(async (config) => {
  return { ...config };
});

client.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    console.log(err);
    throw err.response.data;
  }
);
