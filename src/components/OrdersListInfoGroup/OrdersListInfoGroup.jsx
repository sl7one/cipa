import React from "react";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import "./info-group.scss";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { isItemSelectedHelper } from "../../utils/isItemSelected";
import { setChecked, unsetChecked } from "../../store/ordersSlice";

export default function OrdersListInfoGroup({ total, client, id, date }) {
  const { orderModal } = animationsHelper;
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const onClickMenu = () => {
    orderModal.infoGroup.hide("i" + id);
    orderModal.buttonsGroup.show("b" + id);
  };

  const onChange = (id) => {
    const [{ isChecked }] = orders.filter((el) => el._id === id);
    isChecked ? dispatch(unsetChecked(id)) : dispatch(setChecked(id));
  };

  return (
    <div className="orders-item__info-group" id={"i" + id}>
      <label className="checkbox-label" htmlFor={id}>
        <input
          className="checkbox"
          type="checkbox"
          id={id}
          onChange={() => onChange(id)}
        />
        <div className="mark-wrapper" id={"m" + id}>
          <Icons name="mark" />
        </div>
      </label>
      <span>{moment(date).format("DD.MM.YY")}</span>
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
