import React, { useMemo } from "react";
import "./menu-popup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBroilerFood,
  calculateMedicine,
} from "../../store/formDataSlice";
import { setSelectedProducts } from "../../store/productsSlice";
import { animationsHelper } from "../../utils/animationsHelper";
import { deleteOrder, updateOrder } from "../../store/ordersActions";
import useIdsToString from "../../hooks/useIdsToString";
import { useLocation } from "react-router-dom";

const MenuPopup = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const orders = useSelector((state) => state.orders.orders);
  const { menu, productModal, clientModal } = animationsHelper;
  const ids = useIdsToString();
  const { pathname } = useLocation();

  const onClickAddProduct = () => {
    productModal.show();
    menu.hide();
  };

  const onClickCalculateBroilerFood = () => {
    const cobb = formData["652686067170a8f5411dc752"];
    const ross = formData["652686067170a8f5411dc753"];

    if (!cobb && !ross) {
      menu.hide();
      return;
    }

    dispatch(setSelectedProducts("652686067170a8f5411dc760"));
    productModal.itemOverlay.show("id652686067170a8f5411dc760");
    dispatch(setSelectedProducts("652686067170a8f5411dc761"));
    productModal.itemOverlay.show("id652686067170a8f5411dc761");
    dispatch(setSelectedProducts("652686067170a8f5411dc762"));
    productModal.itemOverlay.show("id652686067170a8f5411dc762");

    dispatch(calculateBroilerFood());

    menu.hide();
  };

  const onClickCalculateMedicine = () => {
    dispatch(calculateMedicine());
    dispatch(setSelectedProducts("652686067170a8f5411dc751"));
    productModal.itemOverlay.show("id652686067170a8f5411dc751");
    menu.hide();
  };

  const onClickBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      menu.hide();
    }
  };

  const onClickAddClient = () => {
    clientModal.show();
    menu.hide();
  };

  const onClickDeleteManyOrders = () => {
    if (!ids.length) return;
    dispatch(deleteOrder({ id: ids, success: () => {}, failed: () => {} }));
  };

  const onClickAddManyOrders = () => {
    if (!ids.length) return;
    dispatch(updateOrder({ id: ids, success: () => {}, failed: () => {} }));
  };

  const counter = useMemo(
    () => orders.filter(({ isChecked }) => isChecked).length,
    [orders]
  );

  const menuList = (pathname) => {
    switch (pathname) {
      case "/orders":
        return [
          {
            title: (
              <p className="menu-list-item-sub">
                {counter ? (
                  <span className="menu-list-counter">{counter}</span>
                ) : null}
                Удалить
              </p>
            ),
            fn: onClickDeleteManyOrders,
          },
          {
            title: (
              <p className="menu-list-item-sub">
                {counter ? (
                  <span className="menu-list-counter">{counter}</span>
                ) : null}
                Продать
              </p>
            ),
            fn: onClickAddManyOrders,
          },
        ];
      case pathname.includes("/orders/new") ||
        pathname.includes("/orders/edit"):
        return [
          { title: "Добавить товар", fn: onClickAddProduct },
          { title: "Добавить данные клиента", fn: onClickAddClient },
          {
            title: "Расчитать корм Бройлерам",
            fn: onClickCalculateBroilerFood,
          },
          { title: "Расчитать выпойку", fn: onClickCalculateMedicine },
        ];
      case "/salles":
        return [{ title: "Нет доступных опций", fn: () => {} }];
      case "/purchases":
        return [{ title: "Нет доступных опций", fn: () => {} }];
      default:
        return [{ title: "Нет доступных опций", fn: () => {} }];
    }
  };

  return (
    <div className="menu-backdrop" onClick={onClickBackDrop}>
      <ul className="menu-modal">
        {menuList(pathname).map(({ title, fn }, idx) => (
          <li key={idx} onClick={fn}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MenuPopup;
