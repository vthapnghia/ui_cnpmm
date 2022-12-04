import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoAPI from "../../../../../API/videoAPI";

const addVideo = createAsyncThunk(
  "ADD_VIDEO",
  async (param, { rejectWithValue }) => {
    try {
      const res = videoAPI.addVideo();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const editVideo = createAsyncThunk(
  "EDIT_VIDEO",
  async (param, { rejectWithValue }) => {
    try {
      const res = videoAPI.editVideo(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const removeVideo = createAsyncThunk(
  "REMOVE_VIDEO",
  async (param, { rejectWithValue }) => {
    try {
      const res = videoAPI.removeVideo(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getVideo = createAsyncThunk(
  "GET_VIDEO",
  async (param, { rejectWithValue }) => {
    try {
      const res = await videoAPI.getVideo();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getVideoByID = createAsyncThunk(
  "GET_VIDEO_BY_ID",
  async (param, { rejectWithValue }) => {
    try {
      const res = await videoAPI.getVideoByID(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  video: null,
  videoById: null,
};

const VideoSlice = createSlice({
  name: "videoSlice",
  initialState,
  extraReducers: {
    [addVideo.fulfilled]: (state, action) => {},
    [editVideo.fulfilled]: (state, action) => {},
    [removeVideo.fulfilled]: (state, action) => {},
    [getVideo.fulfilled]: (state, action) => {
      state.video = action.payload.data;
    },
    [getVideoByID.fulfilled]: (state, action) => {
      state.videoById = action.payload.data;
    },
  },
});

const { reducer } = VideoSlice;
export { addVideo, editVideo, removeVideo, getVideo, getVideoByID };
export default reducer;
