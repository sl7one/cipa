import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

export const login = createAsyncThunk(
  "auth/login",
  async ({ data: userData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/auth/login", userData);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data: userData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/auth/signup", userData);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const current = createAsyncThunk(
  "auth/current",
  async ({ success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.get("/auth/current");
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
