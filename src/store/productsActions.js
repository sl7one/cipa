import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/products");
      return data;
    } catch (error) {
      // failed();
      throw error;
      // return rejectWithValue(error.response.data);
    }
  }
);
