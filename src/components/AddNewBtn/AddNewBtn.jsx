import React from "react";
import { Link } from "react-router-dom";
import "./add-new-btn.scss";
import Icons from "../Icons/Icons";

export default function AddNewBtn({ path }) {
  return (
    <Link className="add-new-btn" to={path}>
      <Icons name="plus" />
    </Link>
  );
}
