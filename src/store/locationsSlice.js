import { createSlice } from "@reduxjs/toolkit";
import { addNewLocation, getAllLocations } from "./locationsActions";

const initialState = {
  locations: [],
  isLoading: false,
  error: "",
};

const pending = (state) => {
  state.isLoading = true;
};

const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload.message;
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllLocations.fulfilled, (state, { payload }) => {
      state.locations = payload;
      state.isLoading = false;
    });

    builder.addCase(addNewLocation.fulfilled, (state, { payload }) => {
      state.locations.push(payload);
      state.isLoading = false;
    });

    builder.addCase(getAllLocations.pending, pending);
    builder.addCase(getAllLocations.rejected, rejected);

    builder.addCase(addNewLocation.pending, pending);
    builder.addCase(addNewLocation.rejected, rejected);
  },
});

export default locationsSlice.reducer;
