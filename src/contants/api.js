const API_URL = {
  USER: {
    LOGIN: "v1/login",
    REGISTER: "v1/login/register",
    FIRST_LOIGN: "v1/user",
    UPDATE_PROFILE: "v1/user",
    GET_USER: "v1/user"
  },
  IMAGE: {
    GET_IMAGE: "/v1/images?page=1&pageSize=2",
    DELETE_IMAGE: "v1/images/:id",
    EDIT_IAMGE: ""
  },
};

export default API_URL;
