import React from "react";
import { isDataTruthyHelper } from "../../utils/isDataTruthy";
import { useSelector } from "react-redux";
import "./add-to-database-btn.scss";

export default function AddToDatabaseBtn() {
  const { clientData, ordersData } = useSelector(
    (state) => state.orders.orderForm
  );

  const isOrderTruthy = () => {
    const isDataOrderTruthy = isDataTruthyHelper({
      data: ordersData,
      key: "quantity",
    });

    const isDataPriceTruthy = isDataTruthyHelper({
      data: ordersData,
      key: "price",
    });

    const isDataClientTruthy =
      clientData.name.length > 0 && clientData.phone.length > 0;

    return isDataOrderTruthy && isDataPriceTruthy && isDataClientTruthy;
  };
  return (
    <button
      type="submit"
      className="order-submit-btn"
      disabled={!isOrderTruthy()}
    >
      Добавить в базу
    </button>
  );
}
