import React, { useContext, useEffect, useState } from "react";
import OrdersPage from "../../Pages/OrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/productsActions";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";

import SallesPage from "../../Pages/SallesPage";
import PurchasesPage from "../../Pages/PurchasesPage";
import { getAllOrders } from "../../store/ordersActions";
import Loader from "../Loader/Loader";
import NewOrderPage from "../../Pages/NewOrderPage";
import EditOrderPage from "../../Pages/EditOrderPage";
import ToastContainer from "../ToastContainer/ToastContainer";
import { Toast } from "../../context/toast-context";
import { useToastContext } from "../../hooks/useToastContext";
import ErrorPage from "../../Pages/ErrorPage";

export default function App() {
  return (
    <Toast.Provider value={useToastContext()}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/new" element={<NewOrderPage />} />
          <Route path="orders/edit/:id" element={<EditOrderPage />} />
          <Route path="salles" element={<SallesPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Toast.Provider>
  );
}
