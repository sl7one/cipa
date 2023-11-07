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
    <div className="salles-item__info-group">
      <span className="salles-item__date">
        {moment(date).format("DD.MM.YY")}
      </span>
      <div className="salles-item__info">
        <span className="salles-item__info-name">{client.name}</span>
        <span className="salles-item__info-phone">{client.phone}</span>
      </div>
      <p className="salles-item__total">{total + " грн"}</p>
      <button
        className="salles-item__menu-btn"
        type="button"
        onClick={() => confirmDelete({ id, client, total })}
      >
        <Icons name="remove" />
      </button>
    </div>
  );
}
