import React from "react";
import "./menu-popup.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { useLocation } from "react-router-dom";
import MenuPopupOrders from "../MenuPopupOrders/MenuPopupOrders";
import MenuPopupOrdersNewEdit from "../MenuPopupOrdersNewEdit/MenuPopupOrdersNewEdit";

const MenuPopup = () => {
  const { pathname } = useLocation();
  const { menu } = animationsHelper;

  const onClickBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      menu.hide();
    }
  };

  const Deafult = () => (
    <ul className="menu-modal">
      <li>Нет доступных опций</li>
    </ul>
  );

  const menuList = {
    "/": <Deafult />,
    "/orders": <MenuPopupOrders />,
    "/orders/new": <MenuPopupOrdersNewEdit />,
    "/orders/edit": <MenuPopupOrdersNewEdit />,
    "/salles": <Deafult />,
    "/purchases": <Deafult />,
    "/clients": <Deafult />,
    "/products": <Deafult />,
  };

  return (
    <div className="menu-backdrop" onClick={onClickBackDrop}>
      {menuList[pathname]}
    </div>
  );
};
export default MenuPopup;
