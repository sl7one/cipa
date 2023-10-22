import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import "./products-page.scss";
import ModalUpdateProduct from "../components/ModalUpdateProduct/ModalUpdateProduct";
import { Product } from "../context/products-context";
import useProductContext from "../hooks/useProductContext";

export default function ProductsPage() {
  return (
    <Product.Provider value={useProductContext()}>
      <ProductsList />
      <ModalUpdateProduct />
    </Product.Provider>
  );
}
