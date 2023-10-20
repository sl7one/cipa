import { createSlice } from "@reduxjs/toolkit";
import { addNewClient, getAllClients, updateClient } from "./clientsActions";

const initialState = {
  clients: [],
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

export const clientsSlice = createSlice({
  name: "clients",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllClients.fulfilled, (state, { payload }) => {
      state.clients = payload;
      state.isLoading = false;
    });

    builder.addCase(addNewClient.fulfilled, (state, { payload }) => {
      state.clients.push(payload);
      state.isLoading = false;
    });

    builder.addCase(updateClient.fulfilled, (state, { payload }) => {
      state.clients.push(payload);
      state.isLoading = false;
    });

    builder.addCase(addNewClient.pending, pending);
    builder.addCase(addNewClient.rejected, rejected);

    builder.addCase(updateClient.pending, pending);
    builder.addCase(updateClient.rejected, rejected);
  },
});

export default clientsSlice.reducer;
