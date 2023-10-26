import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ModalUpdateProduct from "../components/ModalUpdateProduct/ModalUpdateProduct";
import { Select } from "../context/select-context";
import useSelectContext from "../hooks/useSelectContext";
import AddNewBtn from "../components/AddNewBtn/AddNewBtn";

export default function ProductsPage() {
  return (
    <Select.Provider value={useSelectContext()}>
      <AddNewBtn title="Добавить новый продукт" path="/products/new" />
      <ProductsList />
      <ModalUpdateProduct />
    </Select.Provider>
  );
}
