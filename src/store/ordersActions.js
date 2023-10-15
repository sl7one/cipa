import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async ({ success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/orders");
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
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

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/orders/${id}`);
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
