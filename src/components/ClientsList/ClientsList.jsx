import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients-list.scss";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { deleteClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";
import DialogModal from "../DialogModal/DialogModal";
import { setClientData } from "../../store/ordersSlice";

const init = { name: "", phone: "", _id: "" };

export default function ClientsList() {
  const { dialogModal, editClient } = animationsHelper;
  const toast = useContext(Toast);
  const clientsData = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();
  const [client, setClient] = useState(init);

  const onClickEdit = ({ _id, name, phone }) => {
    editClient.show();
    dispatch(setClientData({ _id, name, phone }));
  };

  const onClickYes = ({ _id }) => {
    dispatch(
      deleteClient({
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

  const confirmDeleteContact = (client) => {
    setClient(client);
    dialogModal.show();
  };

  return (
    <>
      <ul className="clients-list">
        {clientsData.map(({ _id, name, phone }, idx) => (
          <li className="clients-item" key={_id}>
            <span className="clients-item__number">{++idx + "."}</span>
            <span>{name}</span>
            <span>{phone}</span>
            <button
              type="button"
              onClick={() => onClickEdit({ _id, name, phone })}
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
