import axios from "axios";
import { encodeUrl } from "../utils/url";

// baseURL: "https://js-post-api.herokuapp.com/api",
const axiosClient = axios.create({
  baseURL: "https://js-post-api.herokuapp.com/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.data.status == 401) {
      if (typeof window !== "undefined") {
        window.location.href = `/login?back_to=${encodeUrl(window.location.pathname + window.location.search)}`;
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
