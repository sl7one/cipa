import React from "react";
import moment from "moment";
import Icons from "../Icons/Icons";
import "./info-group.scss";
import { animationsHelper } from "../../utils/animationsHelper";
export default function SallesListInfoGroup({
  total,
  client,
  _id,
  date,
  confirmDelete,
  setId,
}) {
  const { orderInfo } = animationsHelper;

  const onClickInfo = () => {
    setId(_id);
    orderInfo.show();
  };

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
        onClick={() => onClickInfo({ _id, client, total })}
      >
        <Icons name="info" />
      </button>
      <button
        className="salles-item__menu-btn"
        type="button"
        onClick={() => confirmDelete({ _id, client, total })}
      >
        <Icons name="remove" />
      </button>
    </div>
  );
}
