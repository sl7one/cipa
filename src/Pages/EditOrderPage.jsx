import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import OrderForm from "../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { resetProducts, setSelectedProducts } from "../store/productsSlice";
import {
  resetClienData,
  resetLocation,
  resetMessage,
  resetOrder,
  setOrder,
} from "../store/ordersSlice";
import { Select } from "../context/select-context";
import useSelectContext from "../hooks/useSelectContext";
import { updateOrder } from "../store/ordersActions";
import { Toast } from "../context/toast-context";

export default function EditOrderPage() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const orderData = orders.find((el) => el._id === id);
  const { order, client: clientData } = orderData;

  const dispatch = useDispatch();
  const productsObject = useProducts();
  const toast = useContext(Toast);
  // const { resetSelect } = useContext(Select);

  const orderForm = useSelector((state) => state.orders.orderForm);

  // useEffect(() => {
  //   if (!clientData) return;

  //   const formData = order.reduce(
  //     (acc, { _id, order, quantity, product: productRef }) => {
  //       const product = productsObject[productRef];
  //       return { ...acc, [_id]: { order, quantity, ...product } };
  //     },
  //     {}
  //   );

  //   dispatch(setOrder({ formData, clientData }));
  // }, [clientData, dispatch, order, productsObject]);

  // useEffect(() => {
  //   order.forEach(({ product }) => dispatch(setSelectedProducts(product)));
  // }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const orders = Object.entries(orderForm.ordersData).map(
      ([key, { quantity, price }]) => ({
        _id: key,
        quantity: Number(quantity),
        price: Number(price),
      })
    );

    const order = {
      date: orderForm.dateData.toISOString(),
      client: orderForm.clientData._id,
      order: orders,
      location: orderForm.locationData._id,
      message: orderForm.messageData,
      owner: orderForm.owner,
    };

    dispatch(
      updateOrder({
        data: order,
        success: () => {
          toast.success("Заказ успешно добавлен");
          dispatch(resetOrder());
          dispatch(resetLocation());
          dispatch(resetClienData());
          dispatch(resetMessage());
          dispatch(resetProducts());
          // resetSelect();
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
      <ModalProduct />
      <ModalClient />
      {/* <OrderForm
        onSubmit={onSubmit}
        productsSelected={order.map((el) => ({
          ...el,
          ...productsObject[el.product],
        }))}
      /> */}
    </>
  );
}
