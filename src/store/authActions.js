import store from "store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

const tokenService = {
  setToken: (token) => {
    cipa.defaults.headers["Authorization"] = `Bearer ${token}`;
    store.set("token", token);
  },
  unsetToken: () => {
    cipa.defaults.headers["Authorization"] = "";
    store.remove("token");
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ data: userData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/auth/login", userData);
      tokenService.setToken(data.token);
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
      tokenService.setToken(data.token);
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
      const token = store.get("token");
      tokenService.setToken(token);
      const { data } = await cipa.post("/auth/current", { token });

      console.log(data);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ data: id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.put(`/auth/logout/${id}`);
      tokenService.unsetToken();
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
