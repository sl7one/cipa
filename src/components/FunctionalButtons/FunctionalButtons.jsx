import React from "react";
import "./buttons-group.scss";

export default function FunctionalButtons({ _id, children }) {
  return (
    <div className="orders-item__buttons-group" id={"b" + _id}>
      {children}
    </div>
  );
}
