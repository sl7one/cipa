import React from "react";
import "./menu-btn.scss";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";

const MenuButton = () => {
  const { menu } = animationsHelper;

  const onClickMenu = () => {
    menu.show();
  };

  return (
    <button className="menu-button" type="button" onClick={onClickMenu}>
      <Icons name="dots" />
    </button>
  );
};

export default MenuButton;
