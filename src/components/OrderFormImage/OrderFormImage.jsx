import React from "react";

export default function OrderFormImage({ img, title }) {
  return (
    <div className="thumb">
      <img src={img} alt={title} />
    </div>
  );
}
