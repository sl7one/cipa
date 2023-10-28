import React from "react";
import { Select } from "../context/select-context";
import useSelectContext from "../hooks/useSelectContext";
import AddNewBtn from "../components/AddNewBtn/AddNewBtn";
import ProductsList from "../components/ProductsList/ProductsList";

export default function ProductsPage() {
  return (
    <Select.Provider value={useSelectContext()}>
      <AddNewBtn title="Добавить новый продукт" path="/products/new" />
      <ProductsList />
    </Select.Provider>
  );
}
