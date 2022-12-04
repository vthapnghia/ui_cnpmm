import axiosClient from "../axiosClient";
import { hideLoading, isLoading } from "../Loading";
import { KEY_STORAGE } from "./global";

const isAuthenticated = () => {
  const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
  if (!token) return false;
  return true;
};

const storeJsonObject = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getJsonObject = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

const doRequest = async (method, url, data, headers) => {
  let response = {};
  isLoading();
  try {
    switch (method) {
      case "get":
        response = await axiosClient.get(url, headers);
        break;
      case "post":
        response = await axiosClient.post(url, data, headers );
        break;
      case "put":
        response = await axiosClient.put(url, data, headers);
        break;
      case "delete":
        response = await axiosClient.delete(url, headers);
        break;
      default:
        break;
    }
    hideLoading();
  } catch (error) {
    hideLoading();
  }

  return response;
};

export { isAuthenticated, storeJsonObject, getJsonObject, doRequest };
