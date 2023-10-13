import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./layout.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import MenuPopup from "../MenuPopup/MenuPopup";
import MenuButton from "../MenuButton/MenuButton";
import Routes from "../Routes/Routes";

export default function Layout() {
  const { pathname } = useLocation();
  const { menu } = animationsHelper;

  const onClickMenu = () => {
    menu.show();
  };

  return (
    <>
      <div className="layout">
        <nav>
          <Routes />
        </nav>
        <MenuButton onClickMenu={onClickMenu} />
        <MenuPopup pathname={pathname} />
      </div>
      <Outlet />
    </>
  );
}
