import axios from "axios";
import queryString from "query-string";

// CLIENT REQUEST CONFIG
export const client = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

client.interceptors.request.use(async (config) => {
  return { ...config };
});

client.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err.response.data;
  }
);
