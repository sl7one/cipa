import React from "react";
import "./toast-error.scss";

export default function ToastError({ message, closeToast }) {
  return (
    <div className="toast-error">
      <div className="egg"></div>
      <button className="close" type="button" onClick={closeToast}>
        x
      </button>

      <h2>{message?.statusCode + " " + message?.error}</h2>
      <ol>
        {Array.isArray(message?.message)
          ? message.message.map((el) => <li key={el}>{el}</li>)
          : message.message}
      </ol>
    </div>
  );
}
