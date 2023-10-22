import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./categoriesActions";

const initialState = {
  categories: [],
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

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.isLoading = false;
    });

    // builder.addCase(addNewLocation.fulfilled, (state, { payload }) => {
    //   state.categories.push(payload);
    //   state.isLoading = false;
    // });

    builder.addCase(getAllCategories.pending, pending);
    builder.addCase(getAllCategories.rejected, rejected);

    // builder.addCase(addNewLocation.pending, pending);
    // builder.addCase(addNewLocation.rejected, rejected);
  },
});

export default categoriesSlice.reducer;
