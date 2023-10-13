import React from "react";
import "./menu-btn.scss";
import Icons from "../Icons/Icons";

const MenuButton = ({ onClickMenu }) => {
  return (
    <button className="menu-button" type="button" onClick={onClickMenu}>
      <Icons name="dots" />
    </button>
  );
};

export default MenuButton;
