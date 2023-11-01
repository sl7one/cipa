import React from "react";
import ClientButton from "../ClientButton/ClientButton";
import DatePickerComponent from "../DatePicker/DatePicker";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import { useSelector } from "react-redux";
import { isDataTruthyHelper } from "../../utils/isDataTruthy";

export default function OrderFormHeader() {
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
    <>
      <div className="form-header">
        <ClientButton />
        <DatePickerComponent />

        <button
          type="submit"
          className="order-submit-btn"
          disabled={!isOrderTruthy()}
        >
          Добавить <br /> в базу
        </button>
      </div>
      <AddNewProduct />
    </>
  );
}
