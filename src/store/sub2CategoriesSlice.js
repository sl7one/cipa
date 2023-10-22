import { createSlice } from "@reduxjs/toolkit";
import { getAllSub2Categories } from "./sub2CategoriesActions";

const initialState = {
  sub2categories: [],
  isLoading: false,
  error: "",
};

const pending = (state) => {
  state.isLoading = true;
};

const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload.message;
};

export const sub2CategoriesSlice = createSlice({
  name: "sub2Categories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllSub2Categories.fulfilled, (state, { payload }) => {
      state.sub2categories = payload;
      state.isLoading = false;
    });

    // builder.addCase(addNewLocation.fulfilled, (state, { payload }) => {
    //   state.categories.push(payload);
    //   state.isLoading = false;
    // });

    builder.addCase(getAllSub2Categories.pending, pending);
    builder.addCase(getAllSub2Categories.rejected, rejected);

    // builder.addCase(addNewLocation.pending, pending);
    // builder.addCase(addNewLocation.rejected, rejected);
  },
});

export default sub2CategoriesSlice.reducer;
