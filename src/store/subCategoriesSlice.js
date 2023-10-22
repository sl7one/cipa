import { createSlice } from "@reduxjs/toolkit";
import { getAllSubCategories } from "./subCategoriesActions";

const initialState = {
  subCategories: [],
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

export const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllSubCategories.fulfilled, (state, { payload }) => {
      state.subCategories = payload;
      state.isLoading = false;
    });

    // builder.addCase(addNewLocation.fulfilled, (state, { payload }) => {
    //   state.categories.push(payload);
    //   state.isLoading = false;
    // });

    builder.addCase(getAllSubCategories.pending, pending);
    builder.addCase(getAllSubCategories.rejected, rejected);

    // builder.addCase(addNewLocation.pending, pending);
    // builder.addCase(addNewLocation.rejected, rejected);
  },
});

export default subCategoriesSlice.reducer;
