import React, { useEffect } from "react";
import "./summary.scss";
import { useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import { summary } from "../../utils/summary";

export default function Summary({ category, title }) {
  const { summary: summaryAnimations } = animationsHelper;
  const formData = useSelector((state) => state.form.formData);

  const { totalOrder, totalSumm } = summary({
    category,
    data: formData,
  });

  useEffect(() => {
    const isFillValues = totalOrder > 0 && totalSumm > 0;
    isFillValues
      ? summaryAnimations.show(category ? category : "total")
      : summaryAnimations.hide(category ? category : "total");
  }, [totalOrder, totalSumm, summaryAnimations, category]);

  return (
    <p className="form__summary" id={category ? category : "total"}>
      {title}
      {category ? <span className="count">{totalOrder + " шт"}</span> : null}
      <span className="summ"> {totalSumm + " грн"}</span>
    </p>
  );
}
