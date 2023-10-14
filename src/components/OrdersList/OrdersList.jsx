import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import "./orders-list.scss";
import OrdersListButtonsGroup from "../OrdersListButtonsGroup/OrdersListButtonsGroup";
import OrdersListInfoGroup from "../OrdersListInfoGroup/OrdersListInfoGroup";
import { animationsHelper } from "../../utils/animationsHelper";

export default function OrdersList({ type }) {
  const orders = useSelector((state) => state.orders.orders);
  const { orderModal } = animationsHelper;

  const items = useMemo(
    () =>
      orders.filter(({ isActive }) =>
        type === "orders" ? isActive : !isActive
      ),
    [orders, type]
  );

  useEffect(() => {
    items.forEach(({ isChecked, _id }) => {
      isChecked
        ? orderModal.infoGroup.mark.show("mark" + _id)
        : orderModal.infoGroup.mark.hide("mark" + _id);
    });
  }, [orders, orderModal, items]);

  return (
    <ul className="orders-list">
      {items.map(({ _id, ...rest }) => (
        <li className="orders-item" key={_id}>
          <OrdersListInfoGroup {...rest} id={_id} />
          <OrdersListButtonsGroup id={_id} />
        </li>
      ))}
    </ul>
  );
}
