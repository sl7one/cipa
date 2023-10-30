import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const { data } = await cipa.get("/categories");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async ({ data: categoryData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/categories", categoryData);
      success(data);
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
