import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, getAllOrders, postOrder } from "./ordersActions";

const initialState = {
  orders: [],
  isLoading: false,
  error: "",
};

const pending = (state) => {
  state.isLoading = true;
};

const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setChecked: (state, { payload }) => {
      state.orders = state.orders.map((el) =>
        el._id === payload ? { ...el, isChecked: true } : el
      );
    },
    unsetChecked: (state, { payload }) => {
      state.orders = state.orders.map((el) =>
        el._id === payload ? { ...el, isChecked: false } : el
      );
    },
    resetOrderErrors: (state) => {
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.map((el) => ({ ...el, isChecked: false }));
      state.isLoading = false;
    });
    builder.addCase(postOrder.fulfilled, (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
    });
    builder.addCase(deleteOrder.fulfilled, (state, { payload: { _id } }) => {
      const idx = state.orders.findIndex((el) => el._id === _id);
      state.orders.splice(idx, 1);
      state.orders = [...state.orders];
      state.isLoading = false;
    });

    builder.addCase(getAllOrders.pending, pending);
    builder.addCase(getAllOrders.rejected, rejected);

    builder.addCase(postOrder.pending, pending);
    builder.addCase(postOrder.rejected, rejected);

    builder.addCase(deleteOrder.pending, pending);
    builder.addCase(deleteOrder.rejected, rejected);
  },
});

export const { resetOrderErrors, setChecked, unsetChecked } =
  ordersSlice.actions;

export default ordersSlice.reducer;
