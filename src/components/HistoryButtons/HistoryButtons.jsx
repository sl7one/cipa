import React from "react";
import "./history-btns.scss";

const HistoryButtons = ({
  onClickHistoryPriceButton,
  priceHitory,
  historyButtonOrder,
  onClickHistoryOrderButton,
}) => {
  return (
    <>
      <div className="form__history-buttons">
        {priceHitory.map((value) => (
          <button
            key={value}
            className="btn-price"
            type="button"
            onClick={() => onClickHistoryPriceButton(value)}
          >
            {value + " грн"}
          </button>
        ))}
      </div>
      <button
        className="btn-order"
        type="button"
        onClick={onClickHistoryOrderButton}
      >
        {historyButtonOrder + " шт"}
      </button>
    </>
  );
};

export default HistoryButtons;
