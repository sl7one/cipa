import { createSlice } from "@reduxjs/toolkit";
import { current, login, logout, signup } from "./authActions";
import { pending, rejected } from "../utils/storeUtils";

const initialState = {
  user: {},
  isLoading: false,
  isLogined: false,
  error: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLogined = true;
      state.isLoading = false;
    });

    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    });

    builder.addCase(current.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLogined = true;
      state.isLoading = false;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = initialState.user;
      state.isLogined = initialState.isLogined;
      state.isLoading = initialState.isLoading;
      state.token = initialState.token;
      state.error = initialState.error;
    });

    builder.addCase(login.pending, pending);
    builder.addCase(login.rejected, rejected);

    builder.addCase(signup.pending, pending);
    builder.addCase(signup.rejected, rejected);

    builder.addCase(current.pending, pending);
    builder.addCase(current.rejected, rejected);

    builder.addCase(logout.pending, pending);
    builder.addCase(logout.rejected, rejected);
  },
});

export default authSlice.reducer;
