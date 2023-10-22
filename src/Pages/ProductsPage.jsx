import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import "./products-page.scss";
import ModalUpdateProduct from "../components/ModalUpdateProduct/ModalUpdateProduct";
import { Product } from "../context/products-context";
import useProductContext from "../hooks/useProductContext";
import useSelectContext from "../hooks/useSelectContext";
import { Select } from "../context/select-context";

export default function ProductsPage() {
  return (
    <Product.Provider value={useProductContext()}>
      <Select.Provider value={useSelectContext()}>
        <ProductsList />
        <ModalUpdateProduct />
      </Select.Provider>
    </Product.Provider>
  );
}
