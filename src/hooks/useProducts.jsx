import { useSelector } from "react-redux";

import { useMemo } from "react";

export default function useProducts() {
  const products = useSelector((state) => state.products.products);
  const productsObject = useMemo(
    () =>
      products.reduce((acc, { _id, ...rest }) => ({ ...acc, [_id]: rest }), {}),
    [products]
  );

  return productsObject;
}
