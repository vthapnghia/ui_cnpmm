import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/Authentication/authSlice";
import profileSlice from "./feature/User/pages/Profile/profileSlice";
import ImageSlice from "./feature/User/pages/Image/ImageSlice";
import VideoSlice from "./feature/User/pages/Video/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    image: ImageSlice,
    video: VideoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
