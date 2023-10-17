import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const getAllClients = createAsyncThunk(
  "clients/getAllClients",
  async () => {
    try {
      const { data } = await axios.get("/clients");
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
      const { data } = await axios.post("/clients", clientData);
      success();
      return data;
    } catch (error) {
      failed();
      return rejectWithValue(error.response.data);
    }
  }
);
