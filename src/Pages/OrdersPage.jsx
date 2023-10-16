import React from "react";
import "./orders-page.scss";
import OrdersList from "../components/OrdersList/OrdersList";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  return (
    <div>
      <div className="add-new-order-btn">
        <Link to="/orders/new">Новый заказ</Link>
      </div>
      <OrdersList />
    </div>
  );
}
