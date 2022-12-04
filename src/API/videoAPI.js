import axiosClient from "../axiosClient";
import API_URL from "../contants/api";
import { doRequest } from "../until/common";
import { KEY_STORAGE } from "../until/global";

const videoAPI = {
  addVideo: (data) => {
    // const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const url = API_URL;
    return axiosClient.push(url, data);
  },
  editVideo: (param) => {
    const { data, id } = param;
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const formData = new FormData();
    formData.append("video", data.video);
    formData.append("description", data.description);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    };
    
    const url = API_URL.VIDEO.EDIT_VIDEO.replace(":id", id);
    return doRequest("put", url, data, config);
  },
  removeVideo: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }};
    const url = API_URL.VIDEO.DELETE_VIDEO.replace(":id", data);
    return doRequest("delete", url, "", config);
  },
  getVideo: () => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const url = API_URL.VIDEO.GET_ALL_VIDEO;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    return doRequest("get", url, "", config);
  },

  getVideoByID: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const url = API_URL.VIDEO.GET_VIDEO_BY_ID.replace(":id", data);
    return doRequest("get", url, "", config);
  },
};

export default videoAPI;
