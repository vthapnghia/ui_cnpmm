import axiosClient from "../axiosClient";
import API_URL from "../contants/api";

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
    const url = API_URL;
    return axiosClient.delete(url, data);
  },
  getImage: () => {
    const url = API_URL.IMAGE.GET_IMAGE;
    console.log(url);
    return axiosClient.get(url);
  }
};


export default imageAPI;
