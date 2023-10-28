import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import { setSelectedProducts } from "../../store/productsSlice";
import {
  calculateBroilerFood,
  calculateMedicine,
} from "../../store/ordersSlice";

export default function MenuPopupOrdersNewEdit() {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders.orderForm.ordersData);
  const { menu, productModal, clientModal } = animationsHelper;

  const onClickAddProduct = () => {
    productModal.show();
    menu.hide();
  };

  const onClickAddClient = () => {
    clientModal.show();
    menu.hide();
  };

  const onClickCalculateBroilerFood = () => {
    const cobb = ordersData["652686067170a8f5411dc752"];
    const ross = ordersData["652686067170a8f5411dc753"];

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

  return (
    <ul className="menu-modal">
      <li onClick={onClickAddProduct}>Добавить товар</li>
      <li onClick={onClickAddClient}>Добавить данные клиента</li>
      <li onClick={onClickCalculateBroilerFood}>Расчитать корм Бройлерам</li>
      <li onClick={onClickCalculateMedicine}>Расчитать выпойку</li>
    </ul>
  );
}
