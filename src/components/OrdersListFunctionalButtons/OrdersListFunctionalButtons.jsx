import React, { useContext } from "react";
import { Toast } from "../../context/toast-context";
import { animationsHelper } from "../../utils/animationsHelper";
import { useDispatch } from "react-redux";
import { salleOrder } from "../../store/ordersActions";
import Icons from "../Icons/Icons";
import { Link } from "react-router-dom";
import "./orders-item-buttons.scss";

export default function OrdersListFunctionalButtons({
  _id,
  confirmDelete,
  setId,
  ...rest
}) {
  const toast = useContext(Toast);
  const { orderModal, orderInfo } = animationsHelper;
  const dispatch = useDispatch();

  const onClickHide = () => {
    orderModal.infoGroup.show("i" + _id);
    orderModal.buttonsGroup.hide("b" + _id);
  };

  const onClickSalle = () => {
    dispatch(
      salleOrder({
        data: _id,
        success: () => toast.success("Заказ успешно проведен"),
        failed: (message) => toast.error(message),
      })
    );
  };

  const onClickInfo = () => {
    setId(_id);
    orderInfo.show();
  };

  return (
    <>
      <button
        className="orders-item__buttons-btn"
        type="button"
        onClick={onClickHide}
      >
        <Icons name="back" />
      </button>

      <button
        className="orders-item__buttons-btn"
        type="button"
        onClick={() => confirmDelete({ _id, ...rest })}
      >
        <Icons name="remove" />
      </button>

      <Link className="orders-item__buttons-btn" to={`edit/${_id}`}>
        <Icons name="edit" />
      </Link>

      <button
        className="orders-item__buttons-btn"
        type="button"
        onClick={onClickInfo}
      >
        <Icons name="info" />
      </button>

      <button
        className="orders-item__buttons-btn"
        type="button"
        onClick={onClickSalle}
      >
        <Icons name="hand" />
      </button>
    </>
  );
}
