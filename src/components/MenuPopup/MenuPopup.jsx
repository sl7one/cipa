import React, { useMemo } from "react";
import "./menu-popup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBroilerFood,
  calculateMedicine,
} from "../../store/formDataSlice";
import { setSelectedProducts } from "../../store/productsSlice";
import { animationsHelper } from "../../utils/animationsHelper";

const MenuPopup = ({ pathname }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const orders = useSelector((state) => state.orders.orders);
  const { menu, productModal, clientModal } = animationsHelper;

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
    console.log("object");
  };

  const onClickAddManyOrders = () => {
    console.log("object");
  };

  const counter = useMemo(
    () => orders.filter(({ isChecked }) => isChecked).length,
    [orders]
  );

  const menuList = {
    "/orders": [
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
            Добавить в базу
          </p>
        ),
        fn: onClickAddManyOrders,
      },
    ],
    "/orders/new": [
      { title: "Добавить товар", fn: onClickAddProduct },
      { title: "Добавить данные клиента", fn: onClickAddClient },
      { title: "Расчитать корм Бройлерам", fn: onClickCalculateBroilerFood },
      { title: "Расчитать выпойку", fn: onClickCalculateMedicine },
    ],
    "/salles": [],
    "/purchases": [],
  };

  return (
    <div className="menu-backdrop" onClick={onClickBackDrop}>
      <ul className="menu-modal">
        {menuList[pathname] ? (
          menuList[pathname].map(({ title, fn }) => (
            <li key={title} onClick={fn}>
              {title}
            </li>
          ))
        ) : (
          <li key={1}>Нет доступных опций</li>
        )}
      </ul>
    </div>
  );
};
export default MenuPopup;
