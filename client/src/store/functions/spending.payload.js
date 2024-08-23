import { createSlice } from "@reduxjs/toolkit";

const payload = JSON.parse(localStorage.getItem("spending-payload"));

const initialState = {
  amount: payload?.amount || "",
  description: payload?.description || "",
  date: payload?.date || "",
  contributors: payload?.contributors || [],
  finalContributors: payload?.finalContributors || [],
};

const spendingPayload = createSlice({
  name: "spendingPayload",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setSpendingAmount: (state, action) => {
      state.amount = action.payload;
    },
    setSpendingPayloadWithOutContributors: (state, action) => {
      state.amount = action.payload.amount;
      state.description = action.payload.description;
      state.date = action.payload.date;
      state.finalContributors = [
        {
          isUser: true,
          profile_color: action.payload.profile_color,
          friend_name: action.payload.username,
        },
        ...state.contributors,
      ];
    },
    savePayload: (state, action) => {
      localStorage.setItem(
        "spending-payload",
        JSON.stringify({
          ...action.payload,
          finalContributors: state.finalContributors,
        })
      );
    },

    splitAmountEqually: (state, action) => {
      const totalContributors = state.finalContributors.length;
      console.log(totalContributors);

      const contriAmount = (state.amount / totalContributors).toFixed(2);
      console.log(contriAmount);

      state.finalContributors = state.finalContributors.map((contri) => {
        return {
          ...contri,
          amount: contriAmount,
        };
      });
    },

    onChangeAmount: (state, action) => {
      state.finalContributors[action.payload.index] = {
        ...state.finalContributors[action.payload.index],
        amount: action.payload.amount,
      };
    },

    handleToggleUser: (state, action) => {},

    addSpendingPayloadContributors: (state, action) => {
      state.contributors = [...state.contributors, action.payload];
    },
    setSpendingPayloadUserAmount: (state, action) => {
      state.userAmount = action.payload;
    },
  },
});

export const {
  setFriends,
  setSpendingPayloadWithOutContributors,
  addSpendingPayloadContributors,
  setSpendingPayloadUserAmount,
  setSpendingAmount,
  splitAmountEqually,
  savePayload,
  onChangeAmount,
} = spendingPayload.actions;

export default spendingPayload.reducer;
