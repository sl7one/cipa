import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animationsHelper } from "../utils/animationsHelper";
import { useDispatch, useSelector } from "react-redux";
import useSelectedProducts from "../hooks/useSelectedProducts";
import { Toast } from "../context/toast-context";
import {
  resetClienData,
  resetDate,
  resetLocation,
  resetMessage,
  resetOrder,
} from "../store/ordersSlice";
import { resetProducts } from "../store/productsSlice";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import OrderForm from "../components/OrderForm/OrderForm";
import PurchaseButton from "../components/PurchaseButton/PurchaseButton";
import ModalPurchase from "../components/ModalPurchase/ModalPurchase";
import { addNewPurchase } from "../store/purchasesActions";

export default function NewPurchasePage() {
  const navigate = useNavigate();
  const { productModal } = animationsHelper;
  const products = useSelector((state) => state.products.products);
  const productsSelected = useSelectedProducts(products);
  const dispatch = useDispatch();
  const toast = useContext(Toast);
  const {
    clientData,
    date: dateData,
    ordersData,
  } = useSelector((state) => state.orders.orderForm);

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
    };

    dispatch(
      addNewPurchase({
        data: order,
        success: () => {
          toast.success("Закупка успешно добавлена");
          dispatch(resetOrder());
          dispatch(resetLocation());
          dispatch(resetClienData());
          dispatch(resetMessage());
          dispatch(resetProducts());
          navigate("/purchases");
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
      <ModalPurchase />
      <OrderForm
        onSubmit={onSubmit}
        productsSelected={productsSelected}
        renderButton={<PurchaseButton />}
      />
    </>
  );
}
