import { createSlice } from "@reduxjs/toolkit";
import { addNewSubCategory, getAllSubCategories } from "./subCategoriesActions";

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

    builder.addCase(addNewSubCategory.fulfilled, (state, { payload }) => {
      state.subCategories.push(payload);
      state.isLoading = false;
    });

    builder.addCase(getAllSubCategories.pending, pending);
    builder.addCase(getAllSubCategories.rejected, rejected);

    builder.addCase(addNewSubCategory.pending, pending);
    builder.addCase(addNewSubCategory.rejected, rejected);
  },
});

export default subCategoriesSlice.reducer;
