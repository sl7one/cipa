import React from "react";
import Loader from "../components/Loader/Loader";
import BackBtn from "../components/BackBtn/BackBtn";
import UpdateProductForm from "../components/UpdateProductForm/UpdateProductForm";
import { useSelector } from "react-redux";

export default function EditProductPage() {
  const isLoading = useSelector((state) => state.products.isLoading);

  return (
    <div>
      {isLoading ? (
        <Loader isVisible={isLoading} />
      ) : (
        <>
          <BackBtn path="/products" />
          <UpdateProductForm />
        </>
      )}
    </div>
  );
}
