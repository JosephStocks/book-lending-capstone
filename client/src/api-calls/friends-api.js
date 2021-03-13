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

export const sendFriendRequest = async (pendingFriendUserID) => {
  try {
    return await axiosInstance.post("http://localhost:3005/friends/pending", {
      pendingFriendUserID: pendingFriendUserID,
    });
  } catch (err) {
    console.error(err);
    // toast.error("");
  }
};

export const fetchPendingFriendRequests = async () => {
  try {
    let response = await axiosInstance.get(
      "http://localhost:3005/friends/pending"
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    // toast.error("");
  }
};
