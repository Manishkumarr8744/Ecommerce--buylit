import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const allReviewReducer = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    allReviewRequest(state) {
      state.loading = true;
    },
    allReviewSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  allReviewRequest,
  allReviewSuccess,
  allReviewFail,
  clearErrors,
} = allReviewReducer.actions;

export default allReviewReducer.reducer;
