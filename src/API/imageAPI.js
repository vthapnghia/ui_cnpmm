import axiosClient from "../axiosClient";
import API_URL from "../contants/api";
import { doRequest } from "../until/common";
import { KEY_STORAGE } from "../until/global";

const imageAPI = {
  addImage: (data) => {
    const url = API_URL;
    return axiosClient.push(url, data);
  },
  editImage: (data) => {
    const url = API_URL;
    return axiosClient.put(url, data);
  },
  removeImage: (data) => {
    const headers={ "Content-Type": "application/json", "Authorization": `Bearer ${KEY_STORAGE.ACCESS_TOKEN}`  };
    const url = API_URL.IMAGE.DELETE_IMAGE.replace(":id", data);
    return doRequest("delete",url, headers);
  },
  getImage: () => {
    const url = API_URL.IMAGE.GET_ALL_IMAGE;
    const headers={ "Content-Type": "application/json", "Authorization": `Bearer ${KEY_STORAGE.ACCESS_TOKEN}`  };
    return doRequest("get", url, headers);
  },

  getImageByID: (data) => {
    const headers={ "Content-Type": "application/json", "Authorization": `Bearer ${KEY_STORAGE.ACCESS_TOKEN}`  };
    const url = API_URL.IMAGE.GET_IMAGE_BY_ID.replace(":id", data);
    return doRequest("get", url, headers);
  },
};

export default imageAPI;
