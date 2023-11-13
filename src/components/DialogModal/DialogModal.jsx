import React from "react";
import "./dialog-modal.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import ModalButtons from "../ModalButtons/ModalButtons";
import ButtonClose from "../ButtonClose/ButtonClose";
import ButtonOk from "../ButtonOk/ButtonOk";

export default function DialogModal({ title, onClickYes, children }) {
  const { dialogModal } = animationsHelper;

  return (
    <div className="dialog-modal__backdrop">
      <div className="dialog-modal">
        <h3>{title}</h3>
        <div className="dialog-modal_client">{children}</div>
        <ModalButtons>
          <ButtonOk title="Да" onClose={onClickYes} />
          <ButtonClose title="Нет" onClose={dialogModal.hide} />
        </ModalButtons>
      </div>
    </div>
  );
}
