import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../../Pages/ErrorPage";
import BadConnectionPage from "../../Pages/BadConnectionPage";
import ClientsPage from "../../Pages/ClientsPage";
import ProductsPage from "../../Pages/ProductsPage";
import NewProductPage from "../../Pages/NewProductPage";
import EditProductPage from "../../Pages/EditProductPage";
import Layout from "../Layout/Layout";
import SallesPage from "../../Pages/SallesPage";
import PurchasesPage from "../../Pages/PurchasesPage";
import NewOrderPage from "../../Pages/NewOrderPage";
import EditOrderPage from "../../Pages/EditOrderPage";
import OrdersPage from "../../Pages/OrdersPage";

export default function PrivatRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/new" element={<NewOrderPage />} />
        <Route path="orders/edit/:id" element={<EditOrderPage />} />
        <Route path="salles" element={<SallesPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<NewProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="bad-connection" element={<BadConnectionPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}