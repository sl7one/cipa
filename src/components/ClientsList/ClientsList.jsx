import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients-list.scss";
import Icons from "../Icons/Icons";
import { updateClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";

export default function ClientsList() {
  const toast = useContext(Toast);
  const dispatch = useDispatch();
  const clientsData = useSelector((state) => state.clients.clients);

  const onClickEdit = (_id) => {
    // dispatch(
    //   updateClient({
    //     data: "",
    //     success: () => {
    //       toast.success("Контакт успешно изменен");
    //     },
    //     failed: (message) => {
    //       toast.error(message);
    //     },
    //   })
    // );
  };
  return (
    <ul className="clients-list">
      {clientsData.map(({ _id, name, phone }, idx) => (
        <li className="clients-item" key={_id}>
          <span className="clients-item__number">{++idx + "."}</span>
          <span>{name}</span>
          <span>{phone}</span>
          <button type="button" onClick={() => onClickEdit(_id)}>
            <Icons name="edit" />
          </button>
        </li>
      ))}
    </ul>
  );
}
