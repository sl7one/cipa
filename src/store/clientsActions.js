import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

export const getAllClients = createAsyncThunk(
  "clients/getAllClients",
  async () => {
    try {
      const { data } = await cipa.get("/clients");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewClient = createAsyncThunk(
  "clients/addNewClient",
  async ({ data: clientData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.post("/clients", clientData);
      success(data);
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ data: { _id, ...rest }, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.patch(`/clients/${_id}`, rest);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
