import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/Authentication/authSlice";
import profileSlice from "./feature/User/pages/Profile/profileSlice";
import ImageSlice from "./feature/User/pages/ImageDetail/ImageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profileSlice: profileSlice,
    image: ImageSlice,
  },
});