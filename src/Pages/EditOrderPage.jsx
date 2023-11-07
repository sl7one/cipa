import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import OrderForm from "../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { resetProducts, setSelectedProducts } from "../store/productsSlice";
import {
  resetClienData,
  resetDate,
  resetLocation,
  resetMessage,
  resetOrder,
  setClientData,
  setDate,
  setOrder,
} from "../store/ordersSlice";
// import { Select } from "../context/select-context";
// import useSelectContext from "../hooks/useSelectContext";
import { updateOrder } from "../store/ordersActions";
import { Toast } from "../context/toast-context";
import useSelectedProducts from "../hooks/useSelectedProducts";

export default function EditOrderPage() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const orderData = useMemo(
    () => orders.find((el) => el._id === id),
    [id, orders]
  );

  const products = useSelector((state) => state.products.products);
  const owner = useSelector((state) => state.auth.user._id);
  const productsSelected = useSelectedProducts(products);

  const dispatch = useDispatch();
  const toast = useContext(Toast);
  // const { resetSelect } = useContext(Select);

  const orderForm = useSelector((state) => state.orders.orderForm);

  useEffect(() => {
    const { order, client, date, _id } = orderData;

    order.forEach(({ _id }) => dispatch(setSelectedProducts(_id)));
    dispatch(setOrder({ _id, order }));
    dispatch(setDate(new Date(date)));
    dispatch(setClientData(client));

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

  const onSubmit = (e) => {
    e.preventDefault();

    const orders = Object.entries(orderForm.ordersData).map(
      ([key, { quantity, price }]) => ({
        _id: key,
        quantity: Number(quantity),
        price: Number(price),
      })
    );

    dispatch(
      updateOrder({
        data: {
          _id: orderForm._id,
          body: {
            date: orderForm.date.toISOString(),
            client: orderForm.clientData._id,
            order: orders,
            location: orderForm.location?._id || "",
            message: orderForm.message,
            owner,
          },
        },
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
      <OrderForm onSubmit={onSubmit} productsSelected={productsSelected} />
    </>
  );
}
