import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
});

export default store;
