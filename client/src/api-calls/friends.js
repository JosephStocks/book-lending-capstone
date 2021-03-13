import axios from "axios";
import { toast } from "react-toastify";
import { loadTokenFromLocalStorage } from "../redux/store";

// Adds token to every http request using this axios instance
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = loadTokenFromLocalStorage();

  return config;
});

export const fetchUserSearchResults = async (searchQuery) => {
  try {
    return await axiosInstance.post("http://localhost:3005/users", {
      searchQuery,
    });
  } catch (err) {
    console.error(err);
    // toast.error("");
  }
};
