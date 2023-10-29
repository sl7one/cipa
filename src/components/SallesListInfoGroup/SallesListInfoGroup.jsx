import React from "react";
import moment from "moment";
import Icons from "../Icons/Icons";
import "./info-group.scss";
export default function SallesListInfoGroup({
  total,
  client,
  id,
  date,
  confirmDelete,
}) {
  return (
    <div className="orders-item__info-group">
      <span className="orders-item__date">
        {moment(date).format("DD.MM.YY")}
      </span>
      <div className="orders-item__info">
        <span className="orders-item__info-name">{client.name}</span>
        <span className="orders-item__info-phone">{client.phone}</span>
      </div>
      <p className="orders-item__total">{total + " грн"}</p>
      <button
        className="orders-item__menu-btn"
        type="button"
        onClick={() => confirmDelete({ id, client, total })}
      >
        <Icons name="remove" />
      </button>
    </div>
  );
}
