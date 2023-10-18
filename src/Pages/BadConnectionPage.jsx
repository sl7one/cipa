import React from "react";
import { Link } from "react-router-dom";
import "./error-page.scss";

export default function BadConnectionPage() {
  return (
    <div className="error-page">
      <span className="loader"></span>

      <h1>Что-то пошло не так</h1>
      <p>Проверьте подключение к интернету, и попробуйте позже</p>
      <Link to="/" reloadDocument>
        Перезагрузить
      </Link>
    </div>
  );
}
