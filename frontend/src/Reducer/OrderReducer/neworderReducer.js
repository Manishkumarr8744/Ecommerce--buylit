import { createSlice } from "@reduxjs/toolkit";

const neworderReducer = createSlice({
  name: "newOrder",
  initialState: {},
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
} = neworderReducer.actions;

export default neworderReducer.reducer;
