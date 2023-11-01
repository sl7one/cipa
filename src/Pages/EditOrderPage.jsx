import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import OrderForm from "../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { setSelectedProducts } from "../store/productsSlice";
import { resetOrder, setOrder } from "../store/ordersSlice";
import { Select } from "../context/select-context";
import useSelectContext from "../hooks/useSelectContext";

export default function EditOrderPage() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const productsObject = useProducts();

  const orderData = orders.find((el) => el._id === id);

  const { order, client: clientData } = orderData;

  useEffect(() => {
    if (!clientData) return;

    const formData = order.reduce(
      (acc, { _id, order, quantity, product: productRef }) => {
        const product = productsObject[productRef];
        return { ...acc, [_id]: { order, quantity, ...product } };
      },
      {}
    );

    dispatch(setOrder({ formData, clientData }));
  }, [clientData, dispatch, order, productsObject]);

  useEffect(() => {
    order.forEach(({ product }) => dispatch(setSelectedProducts(product)));
  }, [dispatch, order]);

  return (
    <Select.Provider value={useSelectContext()}>
      <ModalProduct />
      <ModalClient />
      <OrderForm
        productsSelected={order.map((el) => ({
          ...el,
          ...productsObject[el.product],
        }))}
      />
    </Select.Provider>
  );
}
