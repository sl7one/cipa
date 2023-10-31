import React from "react";
import Icons from "../Icons/Icons";
import "./route-navigation-btn.scss";
import { animationsHelper } from "../../utils/animationsHelper";

export default function RouteNavigationButton() {
  const { modalRoutes } = animationsHelper;
  const onClickOpenRoutesModal = () => modalRoutes.show();
  return (
    <button
      className="route-navigation-btn"
      onClick={onClickOpenRoutesModal}
      type="button"
    >
      <Icons name="back" />
    </button>
  );
}
