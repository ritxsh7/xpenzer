import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: null,
  lendings: 0,
  borrowings: 0,
  currentFriend: null,
  groups: null,
  notifications: null,
};

const friendsReducer = createSlice({
  name: "data",
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
    updateBalance: (state, action) => {
      console.log(action.payload);
      state.friends = state.friends.map((f) => {
        if (f.friend_id == action.payload.id)
          return {
            ...f,
            net_balance: f.net_balance + action.payload.amount.balance,
          };
        return f;
      });
    },
  },
});

export const { setFriends, setGroups, setNotifications, updateBalance } =
  friendsReducer.actions;
export default friendsReducer.reducer;
