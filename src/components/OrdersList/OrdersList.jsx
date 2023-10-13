import React from "react";
import { useSelector } from "react-redux";
import "./orders-list.scss";
import OrdersListButtonsGroup from "../OrdersListButtonsGroup/OrdersListButtonsGroup";
import OrdersListInfoGroup from "../OrdersListInfoGroup/OrdersListInfoGroup";

export default function OrdersList() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <ul className="orders-list">
      {orders.map(({ _id, ...rest }) => (
        <li className="orders-item" key={_id}>
          <OrdersListInfoGroup {...rest} id={_id} />
          <OrdersListButtonsGroup id={_id} />
        </li>
      ))}
    </ul>
  );
}
