import axiosClient from "../axiosClient";
import API_URL from "../contants/api";

const imageAPI = {
  addImage: (data) => {
    const url = API_URL;
    return axiosClient.push(url, data);
  },
};

export default imageAPI;
