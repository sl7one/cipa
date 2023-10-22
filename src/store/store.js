import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import formDataSlice from "./formDataSlice";
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
    form: formDataSlice,
    category: categoriesSlice,
    subCategory: subCategoriesSlice,
    subCategory2: sub2CategoriesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["form.date"],
      },
    }),
});
