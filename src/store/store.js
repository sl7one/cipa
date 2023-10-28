import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import ordersSlice from "./ordersSlice";
import locationsSlice from "./locationsSlice";
import clientsSlice from "./clientsSlice";
import categoriesSlice from "./categoriesSlice";
import subCategoriesSlice from "./subCategoriesSlice";
import sub2CategoriesSlice from "./sub2CategoriesSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    orders: ordersSlice,
    clients: clientsSlice,
    locations: locationsSlice,
    categories: categoriesSlice,
    subCategories: subCategoriesSlice,
    sub2categories: sub2CategoriesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["orders.orderForm.date"],
      },
    }),
});
