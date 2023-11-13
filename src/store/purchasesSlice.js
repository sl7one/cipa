import { createSlice } from "@reduxjs/toolkit";
import { pending, rejected } from "../utils/storeUtils";
import {
  addNewPurchase,
  deletePurchase,
  getAllPurchases,
  updatePurchase,
} from "./purchasesActions";

const initialState = {
  purchases: [],
  isLoading: false,
  error: "",
};

export const ordersSlice = createSlice({
  name: "purchases",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllPurchases.fulfilled, (state, { payload }) => {
      state.purchases = payload;
      state.isLoading = false;
    });

    builder.addCase(addNewPurchase.fulfilled, (state, { payload }) => {
      state.purchases.unshift(payload);
      state.isLoading = false;
    });

    builder.addCase(updatePurchase.fulfilled, (state, { payload }) => {
      const idx = state.purchases.findIndex(({ _id }) => _id === payload._id);
      state.purchases.splice(idx, 1, payload);
      state.isLoading = false;
    });

    builder.addCase(deletePurchase.fulfilled, (state, { payload }) => {
      payload.id.forEach((id) => {
        const idx = state.purchases.findIndex(({ _id }) => _id === id);
        state.purchases.splice(idx, 1);
      });
      state.isLoading = false;
    });

    builder.addCase(getAllPurchases.pending, pending);
    builder.addCase(getAllPurchases.rejected, rejected);

    builder.addCase(addNewPurchase.pending, pending);
    builder.addCase(addNewPurchase.rejected, rejected);

    builder.addCase(updatePurchase.pending, pending);
    builder.addCase(updatePurchase.rejected, rejected);

    builder.addCase(deletePurchase.pending, pending);
    builder.addCase(deletePurchase.rejected, rejected);
  },
});

export default ordersSlice.reducer;
