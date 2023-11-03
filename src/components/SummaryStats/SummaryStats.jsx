import React, { useMemo } from "react";
import { summaryHelper } from "../../utils/summary";
import "./summary-stats.scss";

export default function SummaryStats({ data }) {
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

  return (
    <div className="summary-stats">
      <div className="summary-stats__header">
        <span>Категория</span>
        <span>Количество</span>
        <span>Сумма</span>
      </div>
      <ul className="summary-stats__body">
        {resultSummary.map(({ category, totalOrder, totalSumm, orders }, i) => (
          <li key={category}>
            <div className="summary-cell">
              <p>{++i + ". " + category}</p>
              {orders.map(({ title }, idx) => (
                <span key={idx}>{title}</span>
              ))}
            </div>
            <div className="summary-cell">
              <p>{totalOrder + " шт"}</p>
              {orders.map(({ quantity }, idx) => (
                <span key={idx}>{quantity + " шт"}</span>
              ))}
            </div>
            <div className="summary-cell">
              <p>{totalSumm + " грн"}</p>
              {orders.map(({ total }, idx) => (
                <span key={idx}>{total + " грн"}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p>
        Всего по заказам: <span>{ordersTotalSumm + " грн"}</span>
      </p>
    </div>
  );
}
