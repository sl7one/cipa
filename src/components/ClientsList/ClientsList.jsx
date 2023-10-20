import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients-list.scss";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { setClientData } from "../../store/formDataSlice";

export default function ClientsList() {
  const clientsData = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();

  const { editClient } = animationsHelper;

  const onClickEdit = ({ _id, name, phone }) => {
    editClient.show();
    dispatch(setClientData({ _id, name, phone }));
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
        </li>
      ))}
    </ul>
  );
}
