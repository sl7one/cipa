import React from "react";
import OrdersList from "../components/OrdersList/OrdersList";

export default function SallesPage() {
  return (
    <div>
      <OrdersList type="purchases" />
    </div>
  );
}
