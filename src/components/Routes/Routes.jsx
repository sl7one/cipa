import React from "react";
import { NavLink } from "react-router-dom";

export default function Routes() {
  const routes = [
    { title: "Заказы", path: "/orders" },
    { title: "Продажи", path: "/salles" },
    { title: "Закупки", path: "/purchases" },
  ];

  return (
    <ul>
      {routes.map(({ title, path }) => (
        <li key={path}>
          <NavLink to={path}>{title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
