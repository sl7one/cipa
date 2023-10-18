import React from "react";
import { NavLink } from "react-router-dom";

export default function RoutesService() {
  const routes = [
    { title: "Закупки", path: "/purchases" },
    { title: "Клиенты", path: "/clients" },
    { title: "Продукты", path: "/products" },
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
