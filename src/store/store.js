import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import formDataSlice from "./formDataSlice";
import ordersSlice from "./ordersSlice";
import locationsSlice from "./locationsSlice";
import clientsSlice from "./clientsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    orders: ordersSlice,
    clients: clientsSlice,
    locations: locationsSlice,
    form: formDataSlice,
  },
});
