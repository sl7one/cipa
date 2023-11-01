import React, { useContext } from "react";
import { Toast } from "../../context/toast-context";
import { animationsHelper } from "../../utils/animationsHelper";
import { useDispatch } from "react-redux";
import { salleOrder } from "../../store/ordersActions";
import Icons from "../Icons/Icons";
import { Link } from "react-router-dom";

export default function OrdersListFunctionalButtons({
  id,
  confirmDelete,
  ...rest
}) {
  const toast = useContext(Toast);
  const { orderModal } = animationsHelper;
  const dispatch = useDispatch();

  const onClickHide = () => {
    orderModal.infoGroup.show("i" + id);
    orderModal.buttonsGroup.hide("b" + id);
  };

  const onClickSalle = () => {
    dispatch(
      salleOrder({
        data: id,
        success: () => toast.success("Заказ успешно проведен"),
        failed: (message) => toast.error(message),
      })
    );
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

      <Link className="orders-item__buttons-btn" to={`edit/${id}`}>
        <Icons name="edit" />
      </Link>

      <button
        className="orders-item__buttons-btn"
        type="button"
        onClick={() => confirmDelete({ id, ...rest })}
      >
        <Icons name="remove" />
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
