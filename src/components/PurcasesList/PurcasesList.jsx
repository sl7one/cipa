import React from "react";
import "./purchases-list.scss";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import DialogModal from "../DialogModal/DialogModal";

export default function PurcasesList() {
  const purchasesData = useSelector((state) => state.purchases.purchases);

  return (
    <>
      <ul className="purchases-list">
        {purchasesData.map(({ client: { _id, name, phone } }, idx) => (
          <li className="clients-item" key={_id}>
            <span className="clients-item__number">{++idx + "."}</span>
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
              //   onClick={() => confirmDeleteContact({ _id, name, phone })}
            >
              <Icons name="remove" />
            </button>
          </li>
        ))}
      </ul>
      <DialogModal
        title="Подтвердите удаление"
        // onClickYes={() => onClickYes({ _id: client._id })}
      >
        {/* <span>{client.name}</span>
        <span>{client.phone}</span> */}
      </DialogModal>
    </>
  );
}
