import React, { useContext, useEffect, useRef } from "react";
import "../OrderForm/order-form.scss";
import "./modal-client.scss";
import { useDispatch, useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import { addNewClient } from "../../store/clientsActions";
import { addNewLocation } from "../../store/locationsActions";
import CreatableSelect from "react-select/creatable";
import { Toast } from "../../context/toast-context";
import SelectComponent from "../SelectComponent/SelectComponent";
import { selectStyles } from "../../utils/selectStyles";
import { Select } from "../../context/select-context";
import {
  setClientData,
  setLocation,
  setMessage,
} from "../../store/ordersSlice";

const ModalClient = () => {
  const refSelectName = useRef(null);
  const refSelectLocation = useRef(null);
  const dispatch = useDispatch();
  const {
    clientData,
    location: locationData,
    message,
  } = useSelector((state) => state.orders.orderForm);
  const clients = useSelector((state) => state.clients.clients);
  const locations = useSelector((state) => state.locations.locations);
  const toast = useContext(Toast);
  const { setRef } = useContext(Select);
  const { clientModal } = animationsHelper;

  useEffect(() => {
    if (!refSelectName && !refSelectLocation) return;
    setRef([refSelectName, refSelectLocation]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refSelectName, refSelectLocation]);

  const onChangeName = (e) => {
    if (!e) {
      dispatch(setClientData({ name: "", phone: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(setClientData({ name: e.value, phone: "" }));
      return;
    }

    dispatch(
      setClientData({
        _id: e.value._id,
        name: e.value.name,
        phone: e.value.phone,
      })
    );
  };

  const onChangeLocation = (e) => {
    if (!e) {
      dispatch(setLocation({ location: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(setLocation({ location: e.value }));
      return;
    }

    dispatch(setLocation(e.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const results = [];

    const isClientExist = clients.find(({ _id }) => _id === clientData._id);
    if (!isClientExist) {
      const res = await dispatch(
        addNewClient({
          data: clientData,
          success: (data) => {
            toast.success("Добавлен новый контакт");
            dispatch(setClientData(data));
          },
          failed: (error) => {
            toast.error(error);
          },
        })
      );

      results.push(res);
    }

    const isLocationExist = locations.find(
      ({ _id }) => _id === locationData._id
    );
    if (locationData && !isLocationExist) {
      const res = await dispatch(
        addNewLocation({
          data: { location: locationData },
          success: (data) => {
            toast.success("Добавлена новая локация");
            dispatch(setLocation(data));
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

    if (isSuccess) {
      clientModal.hide();
    }
  };

  return (
    <form className="client-modal-form" onSubmit={onSubmit}>
      <p>Информация о клиенте</p>
      <div className="form__input-wrapper">
        <label htmlFor="name">*</label>
        <CreatableSelect
          ref={refSelectName}
          isClearable
          isSearchable
          options={clients.map((el) => ({
            label: (
              <span style={{ textTransform: "capitalize" }}>{el.name}</span>
            ),
            value: el,
          }))}
          placeholder="Имя"
          styles={selectStyles()}
          onChange={onChangeName}
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
          ref={refSelectLocation}
          onChange={onChangeLocation}
          placeholder="Локация"
          options={locations.map((el) => ({
            label: (
              <span style={{ textTransform: "capitalize" }}>{el.location}</span>
            ),
            value: el,
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
