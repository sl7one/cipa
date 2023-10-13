import { createSlice } from "@reduxjs/toolkit";
import { images } from "../utils/products";
import { getAllProducts } from "./productsActions";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const pending = (state, { payload }) => {
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
      state.products = payload.map((el) => ({
        ...el,
        isSelected: false,
        img: images[el.id] ? images[el.id] : images["korm"],
      }));
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.pending, pending);
    builder.addCase(getAllProducts.rejected, rejected);
  },
});

export const { setSelectedProducts, unsetSelectedProducts, resetProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
