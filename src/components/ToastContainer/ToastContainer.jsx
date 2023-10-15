import React, { useContext } from "react";
import { createPortal } from "react-dom";

import "./toast.scss";
import { Toast } from "../../context/toast-context";

export default function ToastContainer() {
  const { message, type } = useContext(Toast);

  return createPortal(
    <div className={`toast ${type}`}>
      <span className="loader"></span>
      {message}
    </div>,
    document.querySelector("#toast")
  );
}
