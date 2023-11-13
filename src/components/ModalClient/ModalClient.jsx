import React, { useEffect } from "react";
import "../OrderForm/order-form.scss";
import "./modal-client.scss";
import { useDispatch, useSelector } from "react-redux";
import { animationsHelper } from "../../utils/animationsHelper";
import Select from "react-select";
import { selectStyles } from "../../utils/selectStyles";
import {
  setClientData,
  setLocation,
  setMessage,
} from "../../store/ordersSlice";
import gsap from "gsap";
import Icons from "../Icons/Icons";
import ModalCreateClient from "../ModalCreateClient/ModalCreateClient";
import ModalCreateLocation from "../ModalCreateLocation/ModalCreateLocation";
import SelectClient from "../SelectClient/SelectClient";
import ModalButtons from "../ModalButtons/ModalButtons";
import ButtonClose from "../ButtonClose/ButtonClose";
import ButtonOk from "../ButtonOk/ButtonOk";

const Buttons = () => {
  useEffect(() => {
    gsap.fromTo(
      ".modal-btns",
      { bottom: "-100", opacity: 0 },
      { bottom: 0, opacity: 1 }
    );
  }, []);
  const { clientModal } = animationsHelper;

  return (
    <div style={{ marginTop: "auto" }}>
      <ModalButtons>
        <ButtonOk type="submit" />
        <ButtonClose title="Закрыть" onClose={clientModal.hide} />
      </ModalButtons>
    </div>
  );
};

const ModalClient = () => {
  const dispatch = useDispatch();
  const { clientData, message } = useSelector(
    (state) => state.orders.orderForm
  );
  const locations = useSelector((state) => state.locations.locations);
  const { clientModal, createClient, createLocation } = animationsHelper;

  const onChangeClient = (e) => {
    if (!e) {
      dispatch(setClientData({ name: "", phone: "", _id: "" }));
      return;
    }
    const [name, phone, _id] = e.value.split(",");

    dispatch(
      setClientData({
        _id,
        name,
        phone,
      })
    );
  };

  const onChangeLocation = (e) => {
    if (!e) {
      dispatch(setLocation({ location: "", _id: "" }));
      return;
    }
    const [location, _id] = e.value.split(",");
    dispatch(setLocation({ location, _id }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    clientModal.hide();
  };

  return (
    <>
      <form className="client-modal-form" onSubmit={onSubmit}>
        <p>Информация о клиенте</p>
        <div className="input-group">
          <div>
            <div className="form__input-wrapper">
              <label htmlFor="name">*</label>
              <SelectClient onChange={onChangeClient} placeholder="Клиент" />
            </div>
          </div>
          <button type="button" onClick={createClient.show}>
            <Icons name="plus" />
          </button>
        </div>
        <div className="input-group">
          <div className="form__input-wrapper">
            <Select
              id="location"
              isClearable
              isSearchable
              onChange={onChangeLocation}
              placeholder="Локация"
              options={locations.map((el) => ({
                label: (
                  <span style={{ textTransform: "capitalize" }}>
                    {el.location}
                  </span>
                ),
                value: el.location + "," + el._id,
              }))}
              styles={selectStyles()}
            />
          </div>
          <button type="button" onClick={createLocation.show}>
            <Icons name="plus" />
          </button>
        </div>
        <div className="form__input-wrapper">
          <textarea
            name="message"
            value={message}
            placeholder="Дополнительно"
            onChange={({ target: { name, value } }) => {
              dispatch(setMessage({ [name]: value }));
            }}
          ></textarea>
        </div>
        {clientData._id ? <Buttons /> : null}
      </form>

      <ModalCreateClient />
      <ModalCreateLocation />
    </>
  );
};

export default ModalClient;
