import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

export const getAllLocations = createAsyncThunk(
  "locations/getAllLocations",
  async () => {
    try {
      const { data } = await cipa.get("/locations");
      return data;
    } catch (error) {
      throw error;
    }
  }
);
