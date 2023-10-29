import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    try {
      const { data } = await cipa.get("/orders");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async ({ data: order, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/orders", order);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const salleOrder = createAsyncThunk(
  "orders/salleOrder",
  async ({ id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.put(`/orders/salle/${id}`);
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
  async ({ data: id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.delete(`/orders/${id}`);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);

export const unsalleOrder = createAsyncThunk(
  "orders/unsalleOrder",
  async ({ data: id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.put(`/orders/unsalle/${id}`);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);
