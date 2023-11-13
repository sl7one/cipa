import React from "react";
import "./modal-purchase.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { useDispatch } from "react-redux";
import { setClientData } from "../../store/ordersSlice";
import Icons from "../Icons/Icons";
import ModalCreateClient from "../ModalCreateClient/ModalCreateClient";
import ButtonClose from "../ButtonClose/ButtonClose";
import ModalButtons from "../ModalButtons/ModalButtons";
import SelectClient from "../SelectClient/SelectClient";

const ModalPurchase = () => {
  const dispatch = useDispatch();

  const { purchaseModal, createClient } = animationsHelper;

  const onClickBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      purchaseModal.hide();
    }
  };

  const onChangeClient = (e) => {
    if (!e) {
      dispatch(setClientData({ name: "", phone: "", _id: "" }));
      return;
    }
    const [name, phone, _id] = e.value.split(",");

    dispatch(
      setClientData({
        _id,
        name,
        phone,
      })
    );
  };

  return (
    <>
      <div className="purchase-modal-backdrop" onClick={onClickBackdrop}>
        <div className="purchase-modal">
          <div className="purchase-modal-input-wrapper">
            <SelectClient placeholder="Поставщик" onChange={onChangeClient} />
            <button type="button" onClick={createClient.show}>
              <Icons name="plus" />
            </button>
          </div>
          <ModalButtons>
            <ButtonClose onClose={purchaseModal.hide} />
          </ModalButtons>
        </div>
      </div>
      <ModalCreateClient />
    </>
  );
};

export default ModalPurchase;
