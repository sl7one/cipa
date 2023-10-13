import React from "react";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import "./info-group.scss";

export default function OrdersListInfoGroup({ total, client, id }) {
  const { orderModal } = animationsHelper;

  const onClickMenu = () => {
    orderModal.infoGroup.hide("i" + id);
    orderModal.buttonsGroup.show("b" + id);
  };

  return (
    <div className="orders-item__info-group" id={"i" + id}>
      <div>
        <input type="checkbox" />
      </div>
      <div className="orders-item__info">
        <span className="orders-item__info-name">{client.name}</span>
        <span className="orders-item__info-phone">{client.phone}</span>
      </div>
      <p className="orders-item__total">{total + " грн"}</p>
      <button
        className="orders-item__menu-btn"
        type="button"
        onClick={onClickMenu}
      >
        <Icons name="dots" />
      </button>
    </div>
  );
}
