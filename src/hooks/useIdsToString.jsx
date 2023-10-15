import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useIdsToString() {
  const orders = useSelector((state) => state.orders.orders);

  const idsToString = useMemo(
    () =>
      orders
        .filter(({ isChecked }) => isChecked)
        .map(({ _id }) => _id)
        .join(","),
    [orders]
  );
  return idsToString;
}
