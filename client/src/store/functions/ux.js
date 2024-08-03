import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const ux = createSlice({
  name: "ux",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = ux.actions;
export default ux.reducer;
