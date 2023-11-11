import React from "react";
import OrdersList from "../components/OrdersList/OrdersList";
import AddNewBtn from "../components/AddNewBtn/AddNewBtn";
import StatsPayload from "../components/StatsPayload/StatsPayload";

export default function OrdersPage() {
  return (
    <div>
      <AddNewBtn title="Добавить новый заказ" path="/orders/new" />
      <div style={{ padding: "5px" }}>
        <OrdersList />
      </div>
      <StatsPayload />
    </div>
  );
}
