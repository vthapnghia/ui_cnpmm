const API_URL = {
  USER: {
    LOGIN: "v1/login",
    REGISTER: "v1/login/register",
    FIRST_LOIGN: "v1/user/",
    UPDATE_PROFILE: "v1/user",
    GET_USER: "v1/user",
  },
  IMAGE: {
    GET_ALL_IMAGE: "v1/images",
    GET_IMAGE_BY_ID: "v1/images/:id",
    DELETE_IMAGE: "v1/images/:id",
    EDIT_IMAGE: "",
  },
  VIDEO: {
    GET_ALL_VIDEO: "v1/videos",
    GET_VIDEO_BY_ID: "v1/videos/:id",
    DELETE_VIDEO: "v1/videos/:id",
    EDIT_VIDEO: "",
  },
};

export default API_URL;
