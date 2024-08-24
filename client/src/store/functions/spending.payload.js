import { createSlice } from "@reduxjs/toolkit";

const payload = JSON.parse(localStorage.getItem("spending-payload"));

const initialState = {
  amount: payload?.amount || "",
  description: payload?.description || "",
  date: payload?.date || "",
  contributors: payload?.contributors || [],
  finalContributors: payload?.finalContributors || [],
  isUser: true,
  userAmount: 0,
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
          contributors: state.contributors,
          finalContributors: state.finalContributors,
        })
      );
    },

    splitAmountEqually: (state, action) => {
      const totalContributors = state.isUser
        ? state.finalContributors.length
        : state.finalContributors.length - 1;

      const contriAmount = (state.amount / totalContributors).toFixed(2);

      state.finalContributors = state.finalContributors.map((contri, index) => {
        if (!state.isUser && index === 0) return { ...contri, amount: 0 };
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
      if (state.finalContributors.length === 2) {
        state.finalContributors[(action.payload.index + 1) % 2] = {
          ...state.finalContributors[(action.payload.index + 1) % 2],
          amount: state.amount - action.payload.amount,
        };
      }
    },

    handleToggleUser: (state, action) => {
      state.isUser = action.payload;
    },

    preparePayload: (state, action) => {
      const payload = state.finalContributors.reduce(
        (accumulator, contri) => {
          if (contri.friend_id) {
            accumulator["registered"].push(contri);
          } else if (contri.isUser) {
            accumulator["user"] = [contri];
          } else {
            accumulator["unregistered"].push(contri);
          }
          return accumulator;
        },
        {
          registered: [],
          unregistered: [],
          user: [],
        }
      );
      state.contributors = payload;
      state.finalContributors = null;
      localStorage.removeItem("spending-payload");
    },

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
  handleToggleUser,
  preparePayload,
  postNewSpending,
} = spendingPayload.actions;

export default spendingPayload.reducer;
