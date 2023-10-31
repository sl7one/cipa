import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useCounter() {
  const orders = useSelector((state) => state.orders.orders);

  const counter = useMemo(
    () => orders.filter(({ isChecked }) => isChecked).length,
    [orders]
  );
  return counter;
}
