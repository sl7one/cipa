import { useState } from "react";

export default function useProductContext() {
  const [product, setProductState] = useState({ title: "", price: 0, img: "" });
  const setProduct = (data) => {
    setProductState((prev) => ({ ...prev, ...data }));
  };
  return { product, setProduct };
}
