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
import { addNewLocation } from "../../store/locationsActions";

import { Toast } from "../../context/toast-context";
import SelectComponent from "../SelectComponent/SelectComponent";

const ModalClient = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const locations = useSelector((state) => state.locations.locations);

  const clientData = useSelector((state) => state.form.clientData);
  const locationData = useSelector((state) => state.form.location);
  const message = useSelector((state) => state.form.message);
  const toast = useContext(Toast);

  const { clientModal } = animationsHelper;

  const onChangeName = (e) => {
    if (!e) {
      dispatch(setClientData({ name: "", phone: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(setClientData({ name: e.value, phone: "" }));
      return;
    }

    dispatch(setClientData({ name: e.value.name, phone: e.value.phone }));
  };

  const onChangeLocation = (e) => {
    if (!e) {
      dispatch(setLocation(""));
      return;
    }

    if (e.__isNew__) {
      dispatch(setLocation(e.value));
      return;
    }

    dispatch(setLocation(e.value.location));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const results = [];

    const isClientExist = clients.find(({ name }) => clientData.name === name);
    if (!isClientExist) {
      const res = await dispatch(
        addNewClient({
          data: clientData,
          success: () => {
            toast.success("Добавлен новый контакт");
          },
          failed: (error) => {
            toast.error(error);
          },
        })
      );

      results.push(res);
    }

    const isLocationExist = locations.find(
      ({ location }) => location === locationData
    );
    if (locationData && !isLocationExist) {
      const res = await dispatch(
        addNewLocation({
          data: { location: locationData },
          success: () => {
            toast.success("Добавлена новая локация");
          },
          failed: (error) => {
            toast.error(error);
          },
        })
      );

      results.push(res);
    }

    const isSuccess = results.every(
      ({ meta: { requestStatus } }) => requestStatus === "fulfilled"
    );

    if (isSuccess) clientModal.hide();
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
        <SelectComponent
          id="location"
          onChange={onChangeLocation}
          placeholder="Локация"
          options={locations.map((el) => ({
            label: (
              <span style={{ textTransform: "capitalize" }}>{el.location}</span>
            ),
            value: el.location,
          }))}
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
