import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errorMessage: "",
  isDrawerOpen: false,
};

const ux = createSlice({
  name: "ux",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    setDrawer: (state, action) => {
      console.log(action.payload);
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { setLoading, setError, setDrawer } = ux.actions;
export default ux.reducer;
