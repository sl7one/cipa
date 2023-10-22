import { useState } from "react";

export default function useProductContext() {
  const [product, setProduct] = useState({});
  return { product, setProduct };
}
