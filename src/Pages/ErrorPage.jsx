import React from "react";
import "./error-page.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <span className="loader"></span>
      <h1>Такой страницы не существует</h1>
      <Link to="/" reloadDocument>
        На главную
      </Link>
      {/* <h1>Что-то пошло не так</h1> */}
      {/* <p>Проверьте подключение к интернету, и попробуйте позже</p>
      <Link to="/" reloadDocument>
        Перезагрузить
      </Link> */}
    </div>
  );
}
