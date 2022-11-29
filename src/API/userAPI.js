import axiosClient from "../axiosClient";
import API_URL from "../contants/api";

const userAPI = {
  login: (data) => {
    const url = API_URL.USER.LOGIN;
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = API_URL.USER.REGISTER;
    return axiosClient.post(url, data);
  },
  updateProfile: (data) => {
    const url = API_URL.USER.UPDATE_PROFILE.replace(":id", data.id);
    return axiosClient.post(url, data.info);
  }
};

export default userAPI;
