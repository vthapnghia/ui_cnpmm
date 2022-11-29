import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const updateProfile = createAsyncThunk("UPDATE_PROFILE", async(param, {rejectWithValue}) => {
    try {
        const res=""
        return res
    } catch (error) {
        rejectWithValue(error)
    }
})

const initialState = {
    profile: {},
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [updateProfile.fulfilled]: (state, action) => {
            const res = action.payload.data;
            state.profile = res;
        }
    }
})

const {reducer} = profileSlice;
export {updateProfile};
export default profileSlice;
