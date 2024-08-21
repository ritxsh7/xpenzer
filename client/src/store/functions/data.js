import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const data = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export const { setFriends } = data.actions;
export default data.reducer;
