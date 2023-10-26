import React from "react";
import { Link } from "react-router-dom";
import Icons from "../Icons/Icons";
import "./back-link.scss";

export default function BackBtn({ path }) {
  return (
    <Link className="back-link" to={path}>
      <Icons name="back" />
    </Link>
  );
}
