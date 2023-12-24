import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./slices/userSlice.js";
const store = configureStore({
  reducer: combineReducers({
    user,
  }),
});

export default store;
