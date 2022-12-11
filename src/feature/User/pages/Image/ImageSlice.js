import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageAPI from "../../../../API/imageAPI";

const addImage = createAsyncThunk(
  "ADD_IMAGE",
  async (param, { rejectWithValue }) => {
    try {
      const res = imageAPI.addImage(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const editImage = createAsyncThunk(
  "EDIT_IMAGE",
  async (param, { rejectWithValue }) => {
    try {
      const res = imageAPI.editImage(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const removeImage = createAsyncThunk(
  "REMOVE_IMAGE",
  async (param, { rejectWithValue }) => {
    try {
      const res = imageAPI.removeImage(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getImage = createAsyncThunk(
  "GET_IMAGE",
  async (param, { rejectWithValue }) => {
    try {
      const res = await imageAPI.getImage();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getImageByID = createAsyncThunk(
  "GET_IMAGE_BY_ID",
  async (param, { rejectWithValue }) => {
    try {
      const res = await imageAPI.getImageByID(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  image: null,
  imgById: null,
};

const ImageSlice = createSlice({
  name: "imageSlice",
  initialState,
  extraReducers: {
    [addImage.fulfilled]: (state, action) => {},
    [editImage.fulfilled]: (state, action) => {},
    [removeImage.fulfilled]: (state, action) => {},
    [getImage.fulfilled]: (state, action) => {
      state.image = action.payload?.data;
    },
    [getImageByID.fulfilled]: (state, action) => {
      state.imgById = action.payload?.data;
    },
  },
});

const { reducer } = ImageSlice;
export { addImage, editImage, removeImage, getImage, getImageByID };
export default reducer;
