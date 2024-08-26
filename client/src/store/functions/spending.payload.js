import { createSlice } from "@reduxjs/toolkit";

const payload = JSON.parse(localStorage.getItem("payload"));

const initialState = {
  amount: payload?.amount || "",
  description: payload?.description || "",
  date: payload?.date || "",
  contributors: payload?.contributors || [],
  isUser: true,
};

const spendingPayload = createSlice({
  name: "spendingPayload",
  initialState,
  reducers: {
    setRefPayload: (state, action) => {
      console.log(action.payload);
      const { amount, description, date } = action.payload;
      state.amount = amount;
      state.description = description;
      state.date = date;
    },

    setSpendingAmount: (state, action) => {
      state.amount = action.payload;
    },

    splitAmountEqually: (state, action) => {
      const contriAmount = (state.amount / state.contributors.length).toFixed(
        2
      );
      state.contributors = state.contributors.map((contri) => {
        return {
          ...contri,
          amount: contriAmount,
        };
      });
    },

    distributeAmount: (state, action) => {
      const remainingContributors = state.contributors.filter(
        (contri) => contri.isManual === false
      );

      const remainingAmount =
        state.amount -
        state.contributors
          .filter((contri) => contri.isManual === true)
          .reduce((sum, contri) => (sum = sum + Number(contri.amount)), 0);

      if (remainingAmount > 0) {
        state.contributors = state.contributors.map((contri, index) => {
          if (index !== action.payload.index && !contri.isManual) {
            return {
              ...contri,
              amount: Number(
                remainingAmount / remainingContributors.length
              ).toFixed(2),
            };
          }
          return contri;
        });
      }
    },

    changeContributorAmount: (state, action) => {
      state.contributors[action.payload.index] = {
        ...state.contributors[action.payload.index],
        amount: action.payload.amount,
        isManual: true,
      };
    },

    removeContributor: (state, action) => {
      state.contributors = state.contributors.filter(
        (contri) => contri.friend_id !== action.payload
      );
    },

    savePayload: (state, action) => {
      localStorage.setItem(
        "payload",
        JSON.stringify({
          ...action.payload,
          contributors: state.contributors,
        })
      );
    },

    changeIsUser: (state, action) => {
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

    addContributor: (state, action) => {
      let isPresent = false;
      state.contributors.map((contri) => {
        if (contri.friend_id === action.payload.friend_id || contri.isUser)
          isPresent = true;
      });
      if (!isPresent)
        state.contributors = [
          { ...action.payload, isManual: false },
          ...state.contributors,
        ];
    },
  },
});

export const {
  setSpendingAmount,
  splitAmountEqually,
  changeContributorAmount,
  changeIsUser,
  preparePayload,
  addContributor,
  setRefPayload,
  savePayload,
  distributeAmount,
  removeContributor,
} = spendingPayload.actions;

export default spendingPayload.reducer;
