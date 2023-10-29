import React, { useContext } from "react";
import moment from "moment";
import Icons from "../Icons/Icons";
import "./info-group.scss";
import { useDispatch } from "react-redux";
import { unsalleOrder } from "../../store/ordersActions";
import { Toast } from "../../context/toast-context";
import { useNavigate } from "react-router-dom";

export default function SallesListInfoGroup({ total, client, id, date }) {
  console.log(id);
  const navigate = useNavigate();
  const toast = useContext(Toast);
  const dispatch = useDispatch();
  const onClickDelete = ({ id }) => {
    dispatch(
      unsalleOrder({
        data: id,
        success: () => {
          toast.success("Заказ распроведен успешно");
          navigate("/orders");
        },
        failed: (message) => toast.error(message),
      })
    );
  };

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
        onClick={() => onClickDelete({ id })}
      >
        <Icons name="remove" />
      </button>
    </div>
  );
}
