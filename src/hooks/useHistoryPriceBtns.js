import { useEffect, useState } from "react";
import store from "store";

const initPriceHistory = () => {
  const prices = store.get("price");
  if (prices) {
    return prices;
  }
  return [];
};

export default function useHistoryPriceBtns() {
  const [priceHitory, setPriceHistory] = useState(initPriceHistory);

  useEffect(() => {
    store.set("price", priceHitory);
  }, [priceHitory]);

  return [priceHitory, setPriceHistory];
}
