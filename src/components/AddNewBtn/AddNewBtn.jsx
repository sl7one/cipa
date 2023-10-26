import React from "react";
import { Link } from "react-router-dom";
import "./add-new-btn.scss";

export default function AddNewBtn({ title, path }) {
  return (
    <Link className="add-new-btn" to={path}>
      {title}
    </Link>
  );
}
