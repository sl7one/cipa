import { createAsyncThunk } from "@reduxjs/toolkit";
import { cipa } from "./axiosBase";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const { data } = await cipa.get("/categories");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// export const addNewLocation = createAsyncThunk(
//   "locations/addNewLocation",
//   async ({ data: obj, success, failed }, { rejectWithValue }) => {
//     try {
//       const { data } = await cipa.post("/locations", obj);
//       success(data);
//       return data;
//     } catch (error) {
//       failed(error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
