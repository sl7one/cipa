import React from "react";
import { useDispatch } from "react-redux";
import { deleteOrder, salleOrder } from "../../store/ordersActions";
import useIdsToString from "../../hooks/useIdsToString";
import { animationsHelper } from "../../utils/animationsHelper";
import "./menu-oders.scss";
import useCounter from "../../hooks/useCounter";

export default function MenuPopupOrders() {
  const dispatch = useDispatch();
  const ids = useIdsToString();
  const { menuOrder } = animationsHelper;
  const counter = useCounter();

  const onClickDeleteManyOrders = () => {
    if (!ids.length) return;
    dispatch(deleteOrder({ data: ids, success: () => {}, failed: () => {} }));
    menuOrder.hide();
  };

  const onClickAddManyOrders = () => {
    if (!ids.length) return;
    dispatch(salleOrder({ data: ids, success: () => {}, failed: () => {} }));
    menuOrder.hide();
  };

  return (
    <ul className="menu-orders-popup">
      <li onClick={onClickDeleteManyOrders}>
        <p className="menu-list-item-sub">
          {counter ? (
            <span className="menu-list-counter">{counter}</span>
          ) : null}
          Удалить
        </p>
      </li>
      <li onClick={onClickAddManyOrders}>
        <p className="menu-list-item-sub">
          {counter ? (
            <span className="menu-list-counter">{counter}</span>
          ) : null}
          Продать
        </p>
      </li>
    </ul>
  );
}
