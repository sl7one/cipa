import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import formDataSlice from "./formDataSlice";
import ordersSlice from "./ordersSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    orders: ordersSlice,
    form: formDataSlice,
  },
});
