import React, { useContext, useEffect } from "react";
import OrderForm from "../components/OrderForm/OrderForm";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import { useDispatch, useSelector } from "react-redux";
import { animationsHelper } from "../utils/animationsHelper";
import useSelectedProducts from "../hooks/useSelectedProducts";
import { addNewOrder } from "../store/ordersActions";
import {
  resetClienData,
  resetDate,
  resetLocation,
  resetMessage,
  resetOrder,
} from "../store/ordersSlice";
import { resetProducts } from "../store/productsSlice";
import { Toast } from "../context/toast-context";
import { useNavigate } from "react-router-dom";

export default function NewOrderPage() {
  const navigate = useNavigate();
  const { productModal } = animationsHelper;
  const products = useSelector((state) => state.products.products);
  const productsSelected = useSelectedProducts(products);
  const dispatch = useDispatch();
  const toast = useContext(Toast);
  const {
    clientData,
    date: dateData,
    location: locationData,
    message: messageData,
    ordersData,
  } = useSelector((state) => state.orders.orderForm);
  const owner = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    productModal.show();
  }, [productModal]);

  const onSubmit = (e) => {
    e.preventDefault();

    const orders = Object.entries(ordersData).map(
      ([key, { quantity, price }]) => ({
        _id: key,
        quantity: Number(quantity),
        price: Number(price),
      })
    );

    const order = {
      date: dateData.toISOString(),
      client: clientData._id,
      order: orders,
      location: locationData._id,
      message: messageData,
      owner,
    };

    dispatch(
      addNewOrder({
        data: order,
        success: () => {
          toast.success("Заказ успешно добавлен");
          dispatch(resetOrder());
          dispatch(resetLocation());
          dispatch(resetClienData());
          dispatch(resetMessage());
          dispatch(resetProducts());
          navigate("/orders");
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetProducts());
      dispatch(resetOrder());
      dispatch(resetClienData());
      dispatch(resetDate());
      dispatch(resetLocation());
      dispatch(resetMessage());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalProduct />
      <ModalClient />
      <OrderForm onSubmit={onSubmit} productsSelected={productsSelected} />
    </>
  );
}
