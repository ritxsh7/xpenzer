import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  lendings: 0,
  borrowings: 0,
  currentFriend: null,
  groups: [],
  notifications: [],
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
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setFriends, setGroups, setNotifications } =
  friendsReducer.actions;
export default friendsReducer.reducer;
