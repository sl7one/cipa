import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, updateProduct } from "./productsActions";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
  productForm: {},
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
    setProductForm: (state, { payload }) => {
      state.productForm = { ...state.productForm, ...payload };
    },
    resetProductForm: (state) => {
      state.productForm = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    });

    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const idx = state.products.findIndex((el) => el._id === payload._id);
      state.products.splice(idx, 1, payload);
      state.isLoading = false;
    });

    builder.addCase(getAllProducts.pending, pending);
    builder.addCase(getAllProducts.rejected, rejected);

    builder.addCase(updateProduct.pending, pending);
    builder.addCase(updateProduct.rejected, rejected);
  },
});

export const {
  setSelectedProducts,
  unsetSelectedProducts,
  resetProducts,
  setProductForm,
  resetProductForm,
} = productsSlice.actions;

export default productsSlice.reducer;
