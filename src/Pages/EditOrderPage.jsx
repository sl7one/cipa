import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import OrderForm from "../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData, setOrder } from "../store/formDataSlice";
import useProducts from "../hooks/useProducts";
import { setSelectedProducts } from "../store/productsSlice";

export default function EditOrderPage() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const productsObject = useProducts();

  const [client = { order: [], client: {} }] = orders.filter(
    (el) => el._id === id
  );
  const { order, client: clientData } = client;

  useEffect(() => {
    if (!clientData) return;

    const formData = order.reduce(
      (acc, { _id, order, price, product: productRef }) => {
        const product = productsObject[productRef];
        return { ...acc, [_id]: { order, price, ...product } };
      },
      {}
    );

    dispatch(setOrder({ formData, clientData }));

    return () => dispatch(resetFormData());
  }, [clientData, dispatch, order, productsObject]);

  useEffect(() => {
    order.forEach(({ product }) => dispatch(setSelectedProducts(product)));
  }, [dispatch, order]);

  return (
    <div>
      <ModalProduct />
      <ModalClient />
      <OrderForm
        productsSelected={order.map((el) => ({
          ...el,
          ...productsObject[el.product],
        }))}
      />
    </div>
  );
}
