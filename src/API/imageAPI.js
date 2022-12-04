import axiosClient from "../axiosClient";
import API_URL from "../contants/api";
import { doRequest } from "../until/common";
import { KEY_STORAGE } from "../until/global";

const imageAPI = {
  addImage: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const url = API_URL;
    return axiosClient.push(url, data);
  },
  editImage: (param) => {
    const { data, id } = param;
    const formData = new FormData();
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    };
    formData.append("image", data.image);
    formData.append("description", data.description);
    const url = API_URL.IMAGE.EDIT_IMAGE.replace(":id", id);
    return doRequest("put", url, formData, config);
  },
  removeImage: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const url = API_URL.IMAGE.DELETE_IMAGE.replace(":id", data);
    return doRequest("delete", url, "", config);
  },
  getImage: () => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const url = API_URL.IMAGE.GET_ALL_IMAGE;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    return doRequest("get", url, "", config);
  },

  getImageByID: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const url = API_URL.IMAGE.GET_IMAGE_BY_ID.replace(":id", data);
    return doRequest("get", url, "", config);
  },
};

export default imageAPI;
