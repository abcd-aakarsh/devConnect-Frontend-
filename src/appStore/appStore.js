import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice.js";
import feedReducer from "./feedSlice/feedSlice.js";
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
