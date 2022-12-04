import API_URL from "../contants/api";
import { doRequest } from "../until/common";
import { KEY_STORAGE } from "../until/global";

const userAPI = {
  
  login: (data) => {
    const url = API_URL.USER.LOGIN;
    const headers = { "Content-Type": "application/json"  };
    return doRequest("post", url, data, headers);
  },
  register: (data) => {
    const url = API_URL.USER.REGISTER;
    const headers = { "Content-Type": "application/json"  };
    return doRequest("post", url, data, headers);
  },
  firstLogin: (data) => {
    let formData = new FormData();
    const headers={ "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN)}`  };
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.FIRST_LOIGN;
    return doRequest("post", url, formData, headers);
  },

  updateProfile: (data) => {
    let formData = new FormData();
    const headers={ "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN)}`  };
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("put", url, formData, headers);
  },
  getUser: (data) => {
    const headers={ "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN)}`  };
    const url = API_URL.USER.UPDATE_PROFILE;
    return doRequest("get", url, headers);
  },
};

export default userAPI;
