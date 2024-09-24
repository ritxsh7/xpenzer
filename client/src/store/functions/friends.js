import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  lendings: 0,
  borrowings: 0,
  currentFriend: null,
};

const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
      state.borrowings = action.payload.borrowings;
      state.lendings = action.payload.lendings;
    },
  },
});

export const { setFriends } = friendsReducer.actions;
export default friendsReducer.reducer;
