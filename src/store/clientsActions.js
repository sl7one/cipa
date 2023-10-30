import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "../api/axiosBase";

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
  async ({ data: clientData, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.patch("/clients", clientData);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async ({ data: id, success, failed }, { rejectWithValue }) => {
    try {
      const { data } = await cipa.delete(`/clients/${id}`);
      success();
      return data;
    } catch (error) {
      failed(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
