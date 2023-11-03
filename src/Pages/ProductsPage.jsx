import React from "react";
import AddNewBtn from "../components/AddNewBtn/AddNewBtn";
import ProductsList from "../components/ProductsList/ProductsList";

export default function ProductsPage() {
  return (
    <>
      <AddNewBtn title="Добавить новый продукт" path="/products/new" />
      <ProductsList />
    </>
  );
}
