import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const getAllLocations = createAsyncThunk(
  "locations/getAllLocations",
  async () => {
    try {
      const { data } = await axios.get("/locations");
      return data;
    } catch (error) {
      throw error;
    }
  }
);
