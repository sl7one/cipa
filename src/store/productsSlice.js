import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, updateProduct } from "./productsActions";

const initialState = {
  products: [],
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

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProducts: (state, { payload }) => {
      state.products = state.products.map((el) =>
        el._id === payload ? { ...el, isSelected: true } : el
      );
    },
    unsetSelectedProducts: (state, { payload }) => {
      state.products = state.products.map((el) =>
        el._id === payload ? { ...el, isSelected: false } : el
      );
    },
    resetProducts: (state) => {
      state.products = state.products.map((el) => ({
        ...el,
        isSelected: false,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    });

    builder.addCase(
      updateProduct.fulfilled,
      (state, { payload: { _id, ...rest } }) => {
        const idx = state.products.findIndex((el) => el._id === _id);
        state.products.splice(idx, { _id, ...rest });
        state.isLoading = false;
      }
    );

    builder.addCase(getAllProducts.pending, pending);
    builder.addCase(getAllProducts.rejected, rejected);

    builder.addCase(updateProduct.pending, pending);
    builder.addCase(updateProduct.rejected, rejected);
  },
});

export const { setSelectedProducts, unsetSelectedProducts, resetProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
