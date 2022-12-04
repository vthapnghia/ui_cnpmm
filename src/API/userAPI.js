import API_URL from "../contants/api";
import { doRequest } from "../until/common";

const userAPI = {
  login: (data) => {
    const url = API_URL.USER.LOGIN;
    return doRequest("post", url, data);
  },
  register: (data) => {
    const url = API_URL.USER.REGISTER;
    return doRequest("post", url, data);
  },
  firstLogin: (data) => {
    let formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.FIRST_LOIGN;
    return doRequest("post", url, formData);
  },

  updateProfile: (data) => {
    let formData = new FormData();
    formData.append("avatar",data.avatar, data.avatar.File);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("put", url, data);
  },
  getUser: (data) => {
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("get", url);
  },
};

export default userAPI;
