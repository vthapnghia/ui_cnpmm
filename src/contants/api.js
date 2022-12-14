const API_URL = {
  USER: {
    LOGIN: "v1/login",
    LOGIN_GOOGLE: "v1/login/google",
    REGISTER: "v1/login/register",
    FIRST_LOIGN: "v1/user/",
    UPDATE_PROFILE: "v1/user",
    GET_USER: "v1/user",
  },
  IMAGE: {
    GET_ALL_IMAGE: "v1/images/getAll",
    GET_IMAGE_BY_ID: "v1/images/:id",
    DELETE_IMAGE: "v1/images/:id",
    EDIT_IMAGE: "v1/images/:id",
    ADD_IMAGE: "v1/images"
  },
  VIDEO: {
    GET_ALL_VIDEO: "v1/videos/getAll",
    GET_VIDEO_BY_ID: "v1/videos/:id",
    DELETE_VIDEO: "v1/videos/:id",
    EDIT_VIDEO: "v1/videos/:id",
    ADD_VIDEO: "v1/videos"
  },
};

export default API_URL;
