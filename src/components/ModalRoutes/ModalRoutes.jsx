import React, { useEffect } from "react";
import "./modal-routes.scss";
import { NavLink, useLocation } from "react-router-dom";
import { animationsHelper } from "../../utils/animationsHelper";

export default function ModalRoutes() {
  const { pathname } = useLocation();
  const { modalRoutes } = animationsHelper;
  const routes = [
    { title: "Заказы", path: "/orders", color: "#FF5733" },
    { title: "Продажи", path: "/salles", color: "#33FF57" },
    { title: "Закупки", path: "/purchases", color: "#5733FF" },
    { title: "Клиенты", path: "/clients", color: "#FF3399" },
    { title: "Продукты", path: "/products", color: "#33CCFF" },
  ];

  const onClickBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      modalRoutes.hide();
    }
  };

  useEffect(() => {
    modalRoutes.hide();
  }, [modalRoutes, pathname]);

  return (
    <div className="modal-backdrop" onClick={onClickBackdrop}>
      <nav>
        <ul>
          {routes.map(({ title, path, color }) => (
            <li key={path}>
              <NavLink color={color} to={path}>
                <p>{title}</p>
                <span
                  className="marker"
                  style={{ backgroundColor: color }}
                ></span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
