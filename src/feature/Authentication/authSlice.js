import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../API/userAPI";
import { storeJsonObject } from "../../until/common";
import { KEY_STORAGE } from "../../until/global";

const login = createAsyncThunk("LOGIN", async (param, { rejectWithValue }) => {
  try {
    const res = await userAPI.login(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const register = createAsyncThunk("REGISTER", async (param, { rejectWithValue }) => {
  try {
    const res = await userAPI.register(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.user = res?.user;
      state.isAuth = true;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res.token);
      storeJsonObject(KEY_STORAGE.CP_USER, res?.user);
    },
    [register.fulfilled]: (state, action) => {

    }
  },
});

const { reducer } = authSlice;
export { login, register };
export default reducer;
