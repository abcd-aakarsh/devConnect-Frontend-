import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: true },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
