import React from "react";
import { useDispatch } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import { setSelectedProducts } from "../../store/productsSlice";
import {
  calculateBroilerFood,
  calculateMedicine,
} from "../../store/ordersSlice";
import "./menu-modal-orers-poultry.scss";

export default function ModalOrderPoultryFunction({ setFlag }) {
  const dispatch = useDispatch();
  const { menuOrderPoultry } = animationsHelper;

  const onClickCalculateBroilerFood = () => {
    dispatch(setSelectedProducts("652686067170a8f5411dc760"));
    dispatch(setSelectedProducts("652686067170a8f5411dc761"));
    dispatch(setSelectedProducts("652686067170a8f5411dc762"));

    dispatch(calculateBroilerFood());

    menuOrderPoultry.hide();
    setFlag(false);
  };

  const onClickCalculateMedicine = () => {
    dispatch(setSelectedProducts("652686067170a8f5411dc751"));
    dispatch(calculateMedicine());

    menuOrderPoultry.hide();
    setFlag(false);
  };

  return (
    <ul className="menu-modal-orers-poultry">
      <li onClick={onClickCalculateBroilerFood}>
        Расчитать корм (только для бройлеров)
      </li>
      <li onClick={onClickCalculateMedicine}>
        Расчитать выпойку (для всех цыплят)
      </li>
    </ul>
  );
}
