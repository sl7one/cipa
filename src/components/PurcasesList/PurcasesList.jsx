import React, { useState, useContext } from "react";
import "./purchases-list.scss";
import { useSelector, useDispatch } from "react-redux";
import Icons from "../Icons/Icons";
import DialogModal from "../DialogModal/DialogModal";
import { animationsHelper } from "../../utils/animationsHelper";
import { Toast } from "../../context/toast-context";
import { deletePurchase } from "../../store/purchasesActions";

const init = { name: "", phone: "", _id: "" };

export default function PurcasesList() {
  const purchasesData = useSelector((state) => state.purchases.purchases);
  const [client, setClient] = useState(init);
  const { dialogModal, editClient } = animationsHelper;
  const dispatch = useDispatch();
  const toast = useContext(Toast);

  const confirmDeleteContact = (client) => {
    setClient(client);
    dialogModal.show();
  };

  const onClickYes = ({ _id }) => {
    dispatch(
      deletePurchase({
        data: _id,
        success: () => {
          toast.success("Контакт успешно удален");
          dialogModal.hide();
          setClient(init);
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
      <ul className="purchases-list">
        {purchasesData.map(({ client: { _id, name, phone } }, idx) => (
          <li className="purchases-item" key={_id}>
            <span className="purchases-item__number">{++idx + "."}</span>
            <span>{name}</span>
            <span>{phone}</span>
            <button
              type="button"
              //   onClick={() => onClickEdit({ _id, name, phone })}
            >
              <Icons name="edit" />
            </button>
            <button
              type="button"
              onClick={() => confirmDeleteContact({ _id, name, phone })}
            >
              <Icons name="remove" />
            </button>
          </li>
        ))}
      </ul>
      <DialogModal
        title="Подтвердите удаление"
        onClickYes={() => onClickYes({ _id: client._id })}
      >
        <span>{client.name}</span>
        <span>{client.phone}</span>
      </DialogModal>
    </>
  );
}
