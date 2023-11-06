import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useCounter({ filterByOwner }) {
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.auth.user._id);

  const counter = useMemo(
    () =>
      orders
        .filter(({ isChecked, isActive }) => isChecked && isActive)
        .filter(({ owner }) => (!filterByOwner ? true : owner === currentUser))
        .length,
    [currentUser, filterByOwner, orders]
  );
  return counter;
}
