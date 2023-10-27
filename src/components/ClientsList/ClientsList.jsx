import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients-list.scss";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { setClientData } from "../../store/formDataSlice";
import { deleteClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";

export default function ClientsList() {
  const toast = useContext(Toast);
  const clientsData = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();

  const { editClient } = animationsHelper;

  const onClickEdit = ({ _id, name, phone }) => {
    editClient.show();
    dispatch(setClientData({ _id, name, phone }));
  };

  const onClickDelete = ({ _id }) => {
    dispatch(
      deleteClient({
        data: _id,
        success: () => toast.success("Контакт успешно удален"),
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
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
          <button type="button" onClick={() => onClickDelete({ _id })}>
            <Icons name="remove" />
          </button>
        </li>
      ))}
    </ul>
  );
}
