import React from "react";
import { Link } from "react-router-dom";
import "./back-link.scss";

export default function BackBtn({ path, title }) {
  return (
    <Link className="back-link" to={path}>
      {title}
    </Link>
  );
}
