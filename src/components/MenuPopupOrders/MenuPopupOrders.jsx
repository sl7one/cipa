import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, updateOrder } from "../../store/ordersActions";
import useIdsToString from "../../hooks/useIdsToString";
import { animationsHelper } from "../../utils/animationsHelper";

export default function MenuPopupOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const ids = useIdsToString();
  const { menu } = animationsHelper;

  const counter = useMemo(
    () => orders.filter(({ isChecked }) => isChecked).length,
    [orders]
  );

  const onClickDeleteManyOrders = () => {
    if (!ids.length) return;
    menu.hide();
    dispatch(deleteOrder({ id: ids, success: () => {}, failed: () => {} }));
  };

  const onClickAddManyOrders = () => {
    if (!ids.length) return;
    menu.hide();
    dispatch(updateOrder({ id: ids, success: () => {}, failed: () => {} }));
  };
  return (
    <ul className="menu-modal">
      <li className="" onClick={onClickDeleteManyOrders}>
        <p className="menu-list-item-sub">
          {counter ? (
            <span className="menu-list-counter">{counter}</span>
          ) : null}
          Удалить
        </p>
      </li>
      <li className="" onClick={onClickAddManyOrders}>
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
