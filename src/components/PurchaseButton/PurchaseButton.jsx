import React from "react";
import { animationsHelper } from "../../utils/animationsHelper";
import { useSelector } from "react-redux";
import "./purchase-btn.scss";

export default function PurchaseButton() {
  const clientData = useSelector((state) => state.orders.orderForm.clientData);
  const { purchaseModal } = animationsHelper;

  return (
    <button className="purchase-btn" type="button" onClick={purchaseModal.show}>
      {clientData.name && clientData.phone ? (
        <>
          <span className="purchase-btn__name">{clientData.name}</span>
          <span className="purchase-btn__phone">{clientData.phone}</span>
        </>
      ) : (
        <>
          Заполнить <br /> данные поставщика
        </>
      )}
    </button>
  );
}
