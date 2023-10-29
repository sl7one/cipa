import React from "react";
import "./buttons-group.scss";

export default function FunctionalButtons({ id, children }) {
  return (
    <div className="orders-item__buttons-group" id={"b" + id}>
      {children}
    </div>
  );
}
