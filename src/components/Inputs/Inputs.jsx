import React from "react";
import Summary from "../Summary/Summary";

export default function Inputs({ list, renderProducts, category }) {
  const items = list
    .filter((el) => el.category === category)
    .reverse()
    .map((el) => renderProducts(el));

  const titles = {
    poultry: "Итого по птице",
    food: "Итого по корму",
    other: "Итого по допам",
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
