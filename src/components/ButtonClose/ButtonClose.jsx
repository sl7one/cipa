import React from "react";
import "./button-close.scss";

export default function ButtonClose({ title = "Закрыть", onClose }) {
  return (
    <button className="close-btn" type="button" onClick={onClose}>
      {title}
    </button>
  );
}
