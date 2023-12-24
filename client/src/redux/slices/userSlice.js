import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userFetch } from "../../config/axiosConfig.js";
const initialState = {
  userLoading: false,
  userInfo: null,
  userErrorMsg: null,
  firstLoad: false,
};

export const authUser = createAsyncThunk(
  "user/auth",
  async ({ endpoint, ...input }, thunkAPI) => {
    try {
      const { data } = await userFetch.post(endpoint, input);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userFetch.post("/logout");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message ||
          error.message ||
          "An unexpected error occured. Please try again later."
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userFetch.get("/profile");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userLoading = false;
        state.userErrorMsg = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.userErrorMsg = action.payload;
        state.userLoading = false;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
        state.userLoading = false;
        state.userErrorMsg = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userErrorMsg = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.firstLoad = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.firstLoad = true;
        state.userErrorMsg = null;
        state.userInfo = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.firstLoad = true;
      });
  },
});

export default userSlice.reducer;
export const userSelector = (state) => state.user;
