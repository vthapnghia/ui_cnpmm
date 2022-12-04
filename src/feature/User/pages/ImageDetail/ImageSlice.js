import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageAPI from "../../../../API/imageAPI";

const addImage = createAsyncThunk("ADD_IMAGE", async(param, {rejectWithValue}) => {
    try {
        const res = "";
        return res
    } catch (error) {
        rejectWithValue(error);
    }
})

const editImage = createAsyncThunk("EDIT_IMAGE", async(param, {rejectWithValue}) => {
  try {
      const res = "";
      return res
  } catch (error) {
      rejectWithValue(error);
  }
})

const removeImage = createAsyncThunk("REMOVE_IMAGE", async(param, {rejectWithValue}) => {
  try {
      const res = "";
      return res
  } catch (error) {
      rejectWithValue(error);
  }
})

const getImage = createAsyncThunk("GET_IMAGE", async(param, {rejectWithValue}) => {
  try {
      const res = await imageAPI.getImage();
      return res
  } catch (error) {
      rejectWithValue(error);
  }
})

const initialState = {
    image: null,
}

const ImageSlice = createSlice({
  name: "imageSlice",
  initialState,
  extraReducers: {
    [addImage.fulfilled]: (state, action) => {},
    [editImage.fulfilled]: (state, action) => {},
    [removeImage.fulfilled]: (state, action) => {},
    [getImage.fulfilled]: (state, action) => {
      state.image = action.payload.data;
    }
  },
});

const { reducer } = ImageSlice;
export { addImage, editImage, removeImage, getImage };
export default reducer;
