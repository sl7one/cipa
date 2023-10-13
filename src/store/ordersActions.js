import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.params = { apiKey: "c97b3465ae444731ade6df5eef92db77" };

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/orders");
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async ({ order, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/orders", order);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/orders/${id}`);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);
