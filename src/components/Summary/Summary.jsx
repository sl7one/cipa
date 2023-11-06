import React, { useEffect, useMemo } from "react";
import "./summary.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { summaryHelper } from "../../utils/summary";

export default function Summary({ data }) {
  const { summary: summaryAnimations } = animationsHelper;

  const { resultSummary, ordersTotalSumm } = useMemo(() => {
    const resultSummary = summaryHelper({
      data,
    });

    const ordersTotalSumm = resultSummary.reduce(
      (acc, { totalSumm }) => (acc += totalSumm),
      0
    );
    return { resultSummary, ordersTotalSumm };
  }, [data]);

  useEffect(() => {
    resultSummary.length && ordersTotalSumm
      ? summaryAnimations.show()
      : summaryAnimations.hide();
  }, [ordersTotalSumm, resultSummary, summaryAnimations]);

  return (
    <div className="form__summary">
      <div className="form__summary-header">
        <span>Товары</span>
        <span>Количество</span>
        <span>Сумма</span>
      </div>
      <ul className="form__summary-body">
        {resultSummary.map(({ category, totalOrder, totalSumm }, i) => (
          <li key={category}>
            <span>{++i + ". " + category}</span>
            <span>{totalOrder + " шт"}</span>
            <span>{totalSumm + " грн"} </span>
          </li>
        ))}
      </ul>
      <p>
        Всего по заказам: <span>{ordersTotalSumm + " грн"}</span>
      </p>
    </div>
  );
}
