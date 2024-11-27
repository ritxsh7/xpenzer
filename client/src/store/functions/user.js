import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { saveUser, logoutUser } = user.actions;
export default user.reducer;
