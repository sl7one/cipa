import { createSlice } from "@reduxjs/toolkit";
import { addNewCategory, getAllCategories } from "./categoriesActions";
import { pending, rejected } from "../utils/storeUtils";

const initialState = {
  categories: [],
  isLoading: false,
  error: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.isLoading = false;
    });

    builder.addCase(addNewCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload);
      state.isLoading = false;
    });

    builder.addCase(getAllCategories.pending, pending);
    builder.addCase(getAllCategories.rejected, rejected);

    builder.addCase(addNewCategory.pending, pending);
    builder.addCase(addNewCategory.rejected, rejected);
  },
});

export default categoriesSlice.reducer;
