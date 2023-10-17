import React from "react";
import "./toast-success.scss";

export default function ToastSuccess({ message }) {
  return (
    <div className="toast-success">
      <span className="loader"></span>
      <p>{message}</p>
    </div>
  );
}
