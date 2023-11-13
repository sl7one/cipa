import React from "react";
import "./button-ok.scss";

export default function ButtonOk({
  type = "button",
  title = "ОК",
  onClickOk = () => {},
}) {
  return (
    <button className="ok-btn" type={type} onClick={onClickOk}>
      {title}
    </button>
  );
}
