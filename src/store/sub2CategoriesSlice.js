import { createSlice } from "@reduxjs/toolkit";
import {
  addNewSub2Category,
  getAllSub2Categories,
} from "./sub2CategoriesActions";
import { pending, rejected } from "../utils/storeUtils";

const initialState = {
  sub2categories: [],
  isLoading: false,
  error: "",
};

export const sub2CategoriesSlice = createSlice({
  name: "sub2categories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllSub2Categories.fulfilled, (state, { payload }) => {
      state.sub2categories = payload;
      state.isLoading = false;
    });

    builder.addCase(addNewSub2Category.fulfilled, (state, { payload }) => {
      state.sub2categories.push(payload);
      state.isLoading = false;
    });

    builder.addCase(getAllSub2Categories.pending, pending);
    builder.addCase(getAllSub2Categories.rejected, rejected);

    builder.addCase(addNewSub2Category.pending, pending);
    builder.addCase(addNewSub2Category.rejected, rejected);
  },
});

export default sub2CategoriesSlice.reducer;
