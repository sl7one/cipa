import React, { useContext } from "react";
import { createPortal } from "react-dom";

import "./toast.scss";
import { Toast } from "../../context/toast-context";

export default function ToastContainer() {
  const { markup } = useContext(Toast);

  return createPortal(
    <div className="toast">{markup}</div>,
    document.querySelector("#toast")
  );
}
