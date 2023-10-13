import React, { useEffect } from "react";
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

export default function App() {
  const dispatch = useDispatch();
  const isLoadingProducts = useSelector((state) => state.products.isLoading);
  const isLoadingOrders = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="orders"
          index
          element={
            <>
              {isLoadingOrders || isLoadingProducts ? (
                <Loader isVisible={isLoadingOrders || isLoadingProducts} />
              ) : (
                <OrdersPage />
              )}
            </>
          }
        />
        <Route path="orders/new" element={<NewOrderPage />} />
        <Route path="salles" element={<SallesPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
      </Route>
    </Routes>
  );
}
