import { useMemo } from "react";

export default function useSelectedProducts(products) {
  const productsSelected = useMemo(
    () => products.filter(({ isSelected }) => isSelected),
    [products]
  );
  return productsSelected;
}
