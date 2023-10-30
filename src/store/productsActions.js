import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const { data } = await cipa.get("/products");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ data: { _id, ...rest }, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.patch(`/products/${_id}`, rest);
      success(data);
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSortIndex = createAsyncThunk(
  "products/updateSortIndex",
  async ({ data: products, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.put("/products", products);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
