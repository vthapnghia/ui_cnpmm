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

const loginGoogle = createAsyncThunk("LOGIN_GOOGLE", async (param, { rejectWithValue }) => {
  try {
    const res = await userAPI.loginGoogle(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const register = createAsyncThunk(
  "REGISTER",
  async (param, { rejectWithValue }) => {
    try {
      const res = await userAPI.register(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const logout = createAsyncThunk("LOGOUT", async (_arg, { rejectWithValue }) => {
  try {
    const res = true;
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.user = res?.user;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res?.token);
      storeJsonObject(KEY_STORAGE.CP_USER, res?.user);
    },
    [register.fulfilled]: (state, action) => {},
    [logout.pending]: (state) => {
      state.user = null;
      localStorage.clear();
    },
    [loginGoogle.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.user = res?.user;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res?.token);
      storeJsonObject(KEY_STORAGE.CP_USER, res?.user);
    },
  },
});

const { reducer } = authSlice;
export { login, register, logout, loginGoogle };
export default reducer;
