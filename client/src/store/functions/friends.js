import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export const { setFriends } = friendsReducer.actions;
export default friendsReducer.reducer;
