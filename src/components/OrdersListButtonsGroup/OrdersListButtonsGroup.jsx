import React from "react";
import Icons from "../Icons/Icons";
import "./buttons-group.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../../store/ordersActions";
import ModalFailed from "../ModalFailed/ModalFailed";

export default function OrdersListButtonsGroup({ id }) {
  const { orderModal } = animationsHelper;
  const error = useSelector((state) => state.orders.error);
  const dispatch = useDispatch();

  const onClickHide = () => {
    orderModal.infoGroup.show("i" + id);
    orderModal.buttonsGroup.hide("b" + id);
  };

  const onClickDelete = () => {
    dispatch(
      deleteOrder({
        id,
        success: () => {
          // orderModal.infoGroup.show("i" + id);
          // orderModal.buttonsGroup.hide("b" + id);
        },
        failed: () => console.log("failed clg"),
      })
    );
  };
  return (
    <>
      <div className="orders-item__buttons-group" id={"b" + id}>
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
          onClick={onClickDelete}
        >
          <Icons name="remove" />
        </button>
        <button className="orders-item__buttons-btn" type="button">
          <Icons name="edit" />
        </button>
        <button className="orders-item__buttons-btn" type="button">
          <Icons name="hand" />
        </button>
      </div>

      <ModalFailed errorObj={error} />
    </>
  );
}
