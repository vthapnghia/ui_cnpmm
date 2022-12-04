import API_URL from "../contants/api";
import { doRequest } from "../until/common";
import { KEY_STORAGE } from "../until/global";

const userAPI = {
  login: (data) => {
    const url = API_URL.USER.LOGIN;
    const config = {headers: { "Content-Type": "application/json" } };
    return doRequest("post", url, data, config);
  },
  register: (data) => {
    const url = API_URL.USER.REGISTER;
    const config = {headers:{ "Content-Type": "application/json" }};
    return doRequest("post", url, data, config);
  },
  firstLogin: (data) => {
    let formData = new FormData();
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    };
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.FIRST_LOIGN;
    return doRequest("post", url, formData, config);
  },

  updateProfile: (data) => {
    let formData = new FormData();
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    };
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("put", url, formData, config);
  },
  getUser: (data) => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("get", url, "", config);
  },
};

export default userAPI;
