import React from "react";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import "./info-group.scss";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setChecked, unsetChecked } from "../../store/ordersSlice";

export default function OrdersListInfoGroup({
  total,
  client,
  id,
  date,
  location,
}) {
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
        <div className="mark-wrapper" id={"mark" + id}>
          <Icons name="mark" />
        </div>
      </label>
      <span className="orders-item__date">
        {moment(date).format("DD.MM.YY")}
      </span>
      <div className="orders-item__info">
        <span className="orders-item__info-name">{client.name}</span>
        <span className="orders-item__info-phone">{client.phone}</span>
        <span className="orders-item__info-location">{location}</span>
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
