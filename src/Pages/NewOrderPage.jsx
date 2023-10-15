import React, { useEffect } from "react";
import OrderForm from "../components/OrderForm/OrderForm";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import ModalClient from "../components/ModalClient/ModalClient";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import { animationsHelper } from "../utils/animationsHelper";
import useSelectedProducts from "../hooks/useSelectedProducts";

export default function NewOrderPage() {
  const isLoading = useSelector((state) => state.products.isLoading);
  const { productModal } = animationsHelper;
  const products = useSelector((state) => state.products.products);
  const productsSelected = useSelectedProducts(products);

  useEffect(() => {
    productModal.show();
  }, [productModal]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ModalProduct />
          <ModalClient />
          <OrderForm productsSelected={productsSelected} />
        </>
      )}
    </>
  );
}
