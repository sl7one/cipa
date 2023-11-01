import React from "react";

export default function Inputs({ list, renderProducts, children }) {
  const items = list.map((el) => renderProducts(el));

  return (
    <>
      {items.length > 0 ? (
        <div className="form__wrapper">
          {children}
          {items}
        </div>
      ) : null}
    </>
  );
}
