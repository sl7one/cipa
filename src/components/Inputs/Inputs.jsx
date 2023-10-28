import React from "react";
import Summary from "../Summary/Summary";

export default function Inputs({ list, renderProducts, category }) {
  const items = list
    .filter((el) => el.category === category)
    .map((el) => renderProducts(el));

  const titles = {
    птица: "Итого по птице",
    корм: "Итого по корму",
    дополнительно: "Итого по допам",
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <div className="form__wrapper" id={category}>
            {items}
            <Summary category={category} title={titles[category]} />
          </div>
        </>
      ) : null}
    </>
  );
}
