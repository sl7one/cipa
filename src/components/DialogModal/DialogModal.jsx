import React from "react";
import "./dialog-modal.scss";
import { animationsHelper } from "../../utils/animationsHelper";

export default function DialogModal({ title, onClickYes, children }) {
  const { dialogModal } = animationsHelper;

  const onClickNo = () => {
    dialogModal.hide();
  };
  return (
    <div className="dialog-modal__backdrop">
      <div className="dialog-modal">
        <h3>{title}</h3>
        <div className="dialog-modal_client">{children}</div>
        <div className="dialog-modal__buttons">
          <button
            className="dialog-modal__button-yes"
            type="button"
            onClick={onClickYes}
          >
            Да
          </button>
          <button
            className="dialog-modal__button-no"
            type="button"
            onClick={onClickNo}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
