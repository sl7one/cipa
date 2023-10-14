import React from "react";
import { useSelector } from "react-redux";
import "./client-btn.scss";
import { animationsHelper } from "../../utils/animationsHelper";

export default function ClientButton() {
  const clientData = useSelector((state) => state.form.clientData);
  const { clientModal } = animationsHelper;

  return (
    <button className="client-btn" type="button" onClick={clientModal.show}>
      {clientData.name && clientData.phone ? (
        <>
          <span className="client-btn__name">{clientData.name}</span>
          <span className="client-btn__phone">{clientData.phone}</span>
        </>
      ) : (
        <>
          Заполнить <br /> данные клиента
        </>
      )}
    </button>
  );
}
