import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
