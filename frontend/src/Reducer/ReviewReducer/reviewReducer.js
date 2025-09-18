import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const ReviewReducer = createSlice({
  name: "newReview",
  initialState,
  reducers: {
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset,
  clearErrors,
} = ReviewReducer.actions;

export default ReviewReducer.reducer;
