import React from "react";

export default function Inputs({
  list,
  renderProducts,
  category,
  renderSummary,
}) {
  const items = list
    .filter((el) => el.category === category)
    .map((el) => renderProducts(el));

  const summary = renderSummary(category);

  return (
    <>
      {items.length > 0 ? (
        <>
          <div className="form__wrapper">{items}</div>
          {summary}
        </>
      ) : null}
    </>
  );
}
