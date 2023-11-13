import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

export const getAllPurchases = createAsyncThunk(
  "purchases/getAllOrders",
  async () => {
    try {
      const { data } = await cipa.get("/purchases");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewPurchase = createAsyncThunk(
  "purchases/addNewPurchase",
  async ({ data: order, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/purchases", order);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePurchase = createAsyncThunk(
  "purchases/updatePurchases",
  async ({ data: { _id, body }, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.patch(`/purchases/${_id}`, body);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePurchase = createAsyncThunk(
  "purchases/deletePurchase",
  async ({ data: id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.delete(`/purchases/${id}`);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);
