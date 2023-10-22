import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

export const getAllSubCategories = createAsyncThunk(
  "categories/getAllSubCategories",
  async () => {
    try {
      const { data } = await cipa.get("/sub-categories");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewSubCategory = createAsyncThunk(
  "categories/addNewSubCategory",
  async ({ data: obj, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/sub-categories", obj);
      success(data);
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
