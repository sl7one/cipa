import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LazyLoad from "../LazyLoad/LazyLoad";
const layout = lazy(() => import("../Layout/Layout"));
const orderPage = lazy(() => import("../../Pages/OrdersPage"));
const newOrderPage = lazy(() => import("../../Pages/NewOrderPage"));
const editOrderPage = lazy(() => import("../../Pages/EditOrderPage"));
const sallesPage = lazy(() => import("../../Pages/SallesPage"));
const purchasePage = lazy(() => import("../../Pages//PurchasesPage"));
const newPurchasePage = lazy(() => import("../../Pages/NewPurchasePage"));
const clientsPage = lazy(() => import("../../Pages/ClientsPage"));
const productsPage = lazy(() => import("../../Pages/ProductsPage"));
const newProductsPage = lazy(() => import("../../Pages/NewProductPage"));
const editProductsPage = lazy(() => import("../../Pages/EditProductPage"));
const badConnectionPage = lazy(() => import("../../Pages/BadConnectionPage"));
const errorPage = lazy(() => import("../../Pages/ErrorPage"));

export default function PrivatRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LazyLoad component={layout} />}>
        <Route path="orders" element={<LazyLoad component={orderPage} />} />
        <Route
          path="orders/new"
          element={<LazyLoad component={newOrderPage} />}
        />
        <Route
          path="orders/edit/:id"
          element={<LazyLoad component={editOrderPage} />}
        />
        <Route path="salles" element={<LazyLoad component={sallesPage} />} />
        <Route
          path="purchases"
          element={<LazyLoad component={purchasePage} />}
        />
        <Route
          path="purchases/new"
          element={<LazyLoad component={newPurchasePage} />}
        />
        <Route path="clients" element={<LazyLoad component={clientsPage} />} />
        <Route
          path="products"
          element={<LazyLoad component={productsPage} />}
        />
        <Route
          path="products/new"
          element={<LazyLoad component={newProductsPage} />}
        />
        <Route
          path="products/edit/:id"
          element={<LazyLoad component={editProductsPage} />}
        />
        <Route
          path="bad-connection"
          element={<LazyLoad component={badConnectionPage} />}
        />
        <Route path="*" element={<LazyLoad component={errorPage} />} />
      </Route>
    </Routes>
  );
}
