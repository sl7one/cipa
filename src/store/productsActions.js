import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

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
