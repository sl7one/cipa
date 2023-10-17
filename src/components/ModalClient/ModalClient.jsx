import React, { useContext } from "react";
import "../OrderForm/order-form.scss";
import "./modal-client.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientData,
  setLocation,
  setMessage,
} from "../../store/formDataSlice";
import { animationsHelper } from "../../utils/animationsHelper";
import { addNewClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";
import SelectComponent from "../SelectComponent/SelectComponent";

const ModalClient = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);

  const clientData = useSelector((state) => state.form.clientData);
  const location = useSelector((state) => state.form.location);
  const message = useSelector((state) => state.form.message);
  const toast = useContext(Toast);

  const { clientModal } = animationsHelper;

  const onChangeName = ({ id, name, phone }) => {
    dispatch(setClientData({ name, phone }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isClientExist = clients.find(({ name }) => clientData.name === name);

    if (!isClientExist) {
      dispatch(
        addNewClient({
          data: clientData,
          success: () => {
            toast.success("Добавлен новый контакт");
            clientModal.hide();
            return;
          },
          failed: (error) => {
            toast.error(error);
            return;
          },
        })
      );
    }

    clientModal.hide();
  };

  return (
    <form className="client-modal-form" onSubmit={onSubmit}>
      <p>Информация о клиенте</p>
      <div className="form__input-wrapper">
        <label htmlFor="name">*</label>
        <SelectComponent
          id="name"
          onChange={onChangeName}
          placeholder="Имя"
          options={clients.map((el) => ({
            label: (
              <span style={{ textTransform: "capitalize" }}>{el.name}</span>
            ),
            value: el,
          }))}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="phone">*</label>
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
      <div className="form__input-wrapper">
        <input
          type="text"
          name="location"
          value={location}
          placeholder="Локация отгрузки"
          onChange={({ target: { name, value } }) =>
            dispatch(setLocation({ [name]: value }))
          }
        />
      </div>
      <div className="form__input-wrapper">
        <textarea
          type="text"
          name="message"
          value={message}
          placeholder="Дополнительно"
          onChange={({ target: { name, value } }) =>
            dispatch(setMessage({ [name]: value }))
          }
        ></textarea>
      </div>
      {clientData.name && clientData.phone ? (
        <button className="submit-btn" type="submit">
          Ок
        </button>
      ) : null}
    </form>
  );
};

export default ModalClient;
