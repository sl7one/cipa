import React, { useEffect } from "react";
import "./loader.scss";
import { animationsHelper } from "../../utils/animationsHelper";

export default function Loader({ isVisible }) {
  const { loader } = animationsHelper;

  useEffect(() => {
    isVisible ? loader.show() : loader.hide();
  }, [isVisible, loader]);

  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  );
}
