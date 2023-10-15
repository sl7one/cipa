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
import EditOrderPage from "../../Pages/EditOrderPage";
import ToastContainer from "../ToastContainer/ToastContainer";
import { Toast } from "../../context/toast-context";
import { useToastContext } from "../../hooks/useToastContext";

export default function App() {
  const dispatch = useDispatch();
  const isLoadingProducts = useSelector((state) => state.products.isLoading);
  const isLoadingOrders = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    dispatch(getAllProducts({ failed: () => console.log("failed") }));
    dispatch(getAllOrders({ failed: () => console.log("failed") }));
  }, [dispatch]);

  return (
    <Toast.Provider value={useToastContext()}>
      {isLoadingOrders || isLoadingProducts ? (
        <Loader isVisible={isLoadingOrders || isLoadingProducts} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="orders" index element={<OrdersPage />} />
            <Route path="orders/new" element={<NewOrderPage />} />
            <Route path="orders/edit/:id" element={<EditOrderPage />} />
            <Route path="salles" element={<SallesPage />} />
            <Route path="purchases" element={<PurchasesPage />} /> */}
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </Toast.Provider>
  );
}
