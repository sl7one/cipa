import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.params = { apiKey: "c97b3465ae444731ade6df5eef92db77" };

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/products");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
