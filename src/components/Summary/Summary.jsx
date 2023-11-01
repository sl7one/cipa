import React, { useEffect } from "react";
import "./summary.scss";
import { useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import { summaryHelper } from "../../utils/summary";

export default function Summary() {
  const { summary: summaryAnimations } = animationsHelper;
  const ordersData = useSelector((state) => state.orders.orderForm.ordersData);

  const resultSummary = summaryHelper({
    data: ordersData,
  });

  const ordersTotalSumm = resultSummary.reduce(
    (acc, { totalSumm }) => (acc += totalSumm),
    0
  );

  useEffect(() => {
    resultSummary.length && ordersTotalSumm
      ? summaryAnimations.show()
      : summaryAnimations.hide();
  }, [ordersTotalSumm, resultSummary, summaryAnimations]);

  return (
    <div className="form__summary">
      <div className="form__summary-header">
        <span>Категория</span>
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
        Всего по заказу: <span>{ordersTotalSumm + " грн"}</span>
      </p>
    </div>
  );
}
