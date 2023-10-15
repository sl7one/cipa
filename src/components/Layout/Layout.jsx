import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import MenuPopup from "../MenuPopup/MenuPopup";
import MenuButton from "../MenuButton/MenuButton";
import Routes from "../Routes/Routes";
import { Toast } from "../../context/toast-context";

export default function Layout() {
  const toast = useContext(Toast);

  return (
    <>
      <div className="layout">
        <nav>
          <Routes />
        </nav>
        <MenuButton />
        <MenuPopup />
      </div>

      <button onClick={() => toast.error("Hello")}>ERROR</button>
      <button onClick={() => toast.success("Hello")}>SUCCESS</button>

      <Outlet />
    </>
  );
}
