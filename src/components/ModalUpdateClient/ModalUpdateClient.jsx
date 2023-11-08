import React, { useContext } from "react";
import "./update-client.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { updateClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";
import { useDispatch, useSelector } from "react-redux";
import { resetClienData, setClientData } from "../../store/ordersSlice";

export default function ModalUpdateClient() {
  const clientData = useSelector((state) => state.orders.orderForm.clientData);

  const toast = useContext(Toast);
  const dispatch = useDispatch();

  const { editClient } = animationsHelper;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateClient({
        data: clientData,
        success: () => {
          toast.success("Контакт успешно изменен");
          editClient.hide();
          dispatch(resetClienData());
        },
        failed: (message) => {
          toast.error(message);
        },
      })
    );
  };

  return (
    <>
      <div className="update-client-backdrop">
        <form className="update-client" onSubmit={onSubmit}>
          <div className="update-wrapper">
            <label htmlFor="name"></label>
            <input
              id="name"
              type="text"
              name="name"
              value={clientData.name}
              placeholder="Имя"
              onChange={({ target: { name, value } }) =>
                dispatch(setClientData({ [name]: value }))
              }
            />
          </div>
          <div className="update-wrapper">
            <label htmlFor="phone"></label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={clientData.phone}
              placeholder="Телефон"
              onChange={({ target: { name, value } }) =>
                dispatch(setClientData({ [name]: value }))
              }
            />
          </div>
          <div className="update-client-buttons">
            <button
              className="update-client-close"
              type="button"
              onClick={editClient.hide}
            >
              Закрыть
            </button>
            <button className="update-client-submit" type="submit">
              Изменить
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
