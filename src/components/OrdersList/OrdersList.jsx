import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./orders-list.scss";
import OrdersListButtonsGroup from "../OrdersListButtonsGroup/OrdersListButtonsGroup";
import OrdersListInfoGroup from "../OrdersListInfoGroup/OrdersListInfoGroup";
import { animationsHelper } from "../../utils/animationsHelper";

export default function OrdersList() {
  const orders = useSelector((state) => state.orders.orders);
  const { orderModal } = animationsHelper;

  useEffect(() => {
    orders.forEach(({ isChecked, _id }) => {
      isChecked
        ? orderModal.infoGroup.mark.show("m" + _id)
        : orderModal.infoGroup.mark.hide("m" + _id);
    });
  }, [orders, orderModal]);

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
