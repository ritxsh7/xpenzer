import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errorMessage: "",
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
  },
});

export const { setLoading, setError } = ux.actions;
export default ux.reducer;
