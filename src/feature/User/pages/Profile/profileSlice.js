import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../../../API/userAPI";

const firstLogin = createAsyncThunk(
  "FIRST_LOGIN",
  async (param, { rejectWithValue }) => {
    try {
      const res = userAPI.firstLogin(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const updateProfile = createAsyncThunk(
  "UPDATE_PROFILE",
  async (param, { rejectWithValue }) => {
    try {
      const res = userAPI.updateProfile(param);
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getUser = createAsyncThunk(
  "GET_USER",
  async (param, { rejectWithValue }) => {
    try {
      const res = userAPI.getUser();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const initialState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: {
    [firstLogin.fulfilled]: (state, action) => {},
    [updateProfile.fulfilled]: (state, action) => {},
    [getUser.fulfilled]: (state, action) => {
      const res = action.payload?.data?.user;
      state.user = res;
    },
  },
});

const { reducer } = profileSlice;
export { firstLogin, updateProfile , getUser};
export default reducer;
