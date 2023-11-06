import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import "./order-info-modal.scss";
import moment from "moment";
import SummaryStats from "../SummaryStats/SummaryStats";
import Icons from "../Icons/Icons";

export default function OrderInfoModal({ _id }) {
  const { orderInfo } = animationsHelper;
  const orders = useSelector((state) => state.orders.orders);
  const item = useMemo(
    () => orders.find(({ _id: itemId }) => itemId === _id),
    [_id, orders]
  );

  const onClickBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      orderInfo.hide();
    }
  };

  const normalizeData = useMemo(() => {
    const orderList = item?.order || [];
    return orderList.reduce((acc, { _id, quantity, total, ...rest }) => {
      acc = {
        ...acc,
        [_id]:
          _id in acc
            ? {
                ...rest,
                quantity: Number(acc[_id].quantity) + Number(quantity),
                total: Number(acc[_id].total) + Number(total),
              }
            : { ...rest, quantity, total },
      };
      return acc;
    }, {});
  }, [item]);

  return (
    <div className="order-info-modal-backdrop" onClick={onClickBackdrop}>
      <div className="order-info-modal">
        <div className="order-info-modal__header">
          <div className="info-modal__header-left">
            <h3>{item?.client?.name}</h3>
            <span>{item?.client?.phone}</span>
          </div>
          <div className="info-modal__header-right">
            <span>{moment(item?.date).format("DD.MM.YY")}</span>
            <span>{item?.location?.location || "Локация не указана"}</span>
          </div>
        </div>
        {item?.message && (
          <p className="order-info-modal__message">
            <Icons name="info" color="blue" />
            {item?.message}
          </p>
        )}
        <div className="order-info-modal__body">
          <SummaryStats data={normalizeData || {}} />
        </div>
      </div>
    </div>
  );
}
