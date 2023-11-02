import React from "react";
import { useSelector } from "react-redux";

export default function OrderFormInputSummary({ _id, total }) {
  const ordersData = useSelector((state) => state.orders.orderForm.ordersData);
  const totalCount =
    (Number(ordersData[_id]?.quantity) || 0) *
    (Number(ordersData[_id]?.price) || 0);

  return (
    <div className="form__input-wrapper">
      <input
        type="number"
        className="form__input total"
        name={_id}
        value={total || totalCount || 0}
        readOnly
      />
      <label htmlFor={_id}>грн</label>
    </div>
  );
}
