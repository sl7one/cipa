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
  _id,
  date,
  location,
}) {
  const { orderModal } = animationsHelper;
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const onClickMenu = () => {
    orderModal.infoGroup.hide("i" + _id);
    orderModal.buttonsGroup.show("b" + _id);
  };

  const onChange = (_id) => {
    const { isChecked } = orders.find((el) => el._id === _id);
    isChecked ? dispatch(unsetChecked(_id)) : dispatch(setChecked(_id));
  };

  return (
    <div className="orders-item__info-group" id={"i" + _id}>
      <label className="checkbox-label" htmlFor={_id}>
        <input
          className="checkbox"
          type="checkbox"
          id={_id}
          onChange={() => onChange(_id)}
        />
        <div className="mark-wrapper" id={"mark" + _id}>
          <Icons name="mark" />
        </div>
      </label>
      <span className="orders-item__date">
        {moment(date).format("DD.MM.YY")}
      </span>
      <a className="orders-item__info" href={`tel:${client.phone}`}>
        <Icons name="phone" />
        <div>
          <span className="orders-item__info-name">{client.name}</span>
          <span className="orders-item__info-phone">{client.phone}</span>
          {location && (
            <span className="orders-item__info-location">{location}</span>
          )}
        </div>
      </a>
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
