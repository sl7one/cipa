import React from "react";
import "../ModalOrder/order-form.scss";
import "./modal-client.scss";
import { useDispatch, useSelector } from "react-redux";
import { setClientData } from "../../store/formDataSlice";
import { animationsHelper } from "../../utils/animationsHelper";

const ModalClient = () => {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => state.form.clientData);
  const { clientModal } = animationsHelper;

  const onSubmit = (e) => {
    e.preventDefault();
    clientModal.hide();
  };

  return (
    <form className="client-modal-form" onSubmit={onSubmit}>
      <p>Информация о клиенте</p>
      <div className="form__input-wrapper">
        <label htmlFor="name">*</label>
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
          value={clientData.location}
          placeholder="Локация отгрузки"
          onChange={({ target: { name, value } }) =>
            dispatch(setClientData({ [name]: value }))
          }
        />
      </div>
      <div className="form__input-wrapper">
        <textarea
          type="text"
          name="message"
          value={clientData.message}
          placeholder="Дополнительно"
          onChange={({ target: { name, value } }) =>
            dispatch(setClientData({ [name]: value }))
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
