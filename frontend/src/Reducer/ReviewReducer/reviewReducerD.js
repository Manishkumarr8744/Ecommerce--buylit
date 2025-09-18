import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isDeleted: false,
  error: null,
};

const reviewReducerD = createSlice({
  name: "review delete",
  initialState,
  reducers: {
    deleteReviewRequest(state) {
      state.loading = true;
    },
    deleteReviewSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewReset(state) {
      state.isDeleted = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  deleteReviewReset,
  clearErrors,
} = reviewReducerD.actions;

export default reviewReducerD.reducer;
