import React from "react";
import { useSelector } from "react-redux";

export default function OrderFormInputSummary({ id }) {
  const ordersData = useSelector((state) => state.orders.orderForm.ordersData);
  return (
    <div className="form__input-wrapper">
      <input
        type="number"
        className="form__input total"
        name={id}
        value={
          ordersData[id]?.price && ordersData[id]?.order
            ? ordersData[id].price * ordersData[id].order
            : 0
        }
        readOnly
      />
      <label htmlFor={id}>грн</label>
    </div>
  );
}
