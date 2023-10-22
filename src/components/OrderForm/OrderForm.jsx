import React, { useContext, useEffect, useState } from "react";
import "./order-form.scss";
import { useDispatch, useSelector } from "react-redux";
import { isDataTruthyHelper } from "../../utils/isDataTruthy";
import {
  initFormData,
  resetFormData,
  setFormDataByHistoryButtons,
} from "../../store/formDataSlice";
import useHistoryPriceBtns from "../../hooks/useHistoryPriceBtns";
import Inputs from "../Inputs/Inputs";
import OrderFormGroup from "../OrderFormGroup/OrderFormGroup";
import Summary from "../Summary/Summary";
import DatePickerComponent from "../DatePicker/DatePicker";
import ClientButton from "../ClientButton/ClientButton";
import { resetProducts } from "../../store/productsSlice";
import HistoryButtons from "../HistoryButtons/HistoryButtons";
import { postOrder } from "../../store/ordersActions";
import Loader from "../Loader/Loader";
import { animationsHelper } from "../../utils/animationsHelper";
import OrderFormButtonsGroup from "../OrderFormButtonsGroup/OrderFormButtonsGroup";
import { Toast } from "../../context/toast-context";
import { Select } from "../../context/select-context";

export default function ModalOrder({ productsSelected }) {
  const toast = useContext(Toast);
  const { resetSelect } = useContext(Select);
  const [historyButtonOrder, setHistoryButtonOrder] = useState(null);

  const isLoading = useSelector((state) => state.orders.isLoading);
  const formData = useSelector((state) => state.form.formData);
  const clientData = useSelector((state) => state.form.clientData);
  const dateData = useSelector((state) => state.form.date);
  const locationData = useSelector((state) => state.form.location);
  const messageData = useSelector((state) => state.form.message);

  const dispatch = useDispatch();

  const [priceHitory, setPriceHistory] = useHistoryPriceBtns();
  const { historyButtons } = animationsHelper;

  useEffect(() => {
    dispatch(initFormData({ productsSelected }));
  }, [productsSelected, dispatch]);

  useEffect(() => {
    const isDataPriceTruthy = isDataTruthyHelper({
      data: formData,
      key: "price",
    });
    const isDataOrderTruthy = isDataTruthyHelper({
      data: formData,
      key: "order",
    });

    if (isDataPriceTruthy) historyButtons.price.hide();
    if (isDataOrderTruthy) historyButtons.order.hide();
  }, [formData, historyButtons]);

  const onFocusPrice = () => {
    historyButtons.order.hide();
    const isDataPriceTruthy = isDataTruthyHelper({
      data: formData,
      key: "price",
    });

    if (isDataPriceTruthy) {
      historyButtons.price.hide();
      return;
    }
    if (priceHitory.length > 0) historyButtons.price.show();
  };

  const onBlurPrice = ({ target: { value } }) => {
    if (!value || Number(value) <= 0) return;

    setPriceHistory((prev) => {
      prev.unshift(value);
      return [...new Set(prev)].slice(0, 3);
    });
  };

  const onFocusOrder = () => {
    historyButtons.price.hide();
    if (!historyButtonOrder) return;
    historyButtons.order.show();
  };

  const onBlurOrder = ({ target: { value } }) => {
    if (historyButtonOrder) {
      historyButtons.order.show();
    }

    if (!value) return;
    setHistoryButtonOrder(value);
  };

  const onClickHistoryPriceButton = (value) => {
    dispatch(setFormDataByHistoryButtons({ key: "price", value }));
  };

  const onClickHistoryOrderButton = () => {
    dispatch(
      setFormDataByHistoryButtons({
        key: "order",
        value: historyButtonOrder,
      })
    );
  };

  const isOrderTruthy = () => {
    const isDataOrderTruthy = isDataTruthyHelper({
      data: formData,
      key: "order",
    });

    const isDataPriceTruthy = isDataTruthyHelper({
      data: formData,
      key: "price",
    });

    const isDataClientTruthy =
      clientData.name.length > 0 && clientData.phone.length > 0;

    return isDataOrderTruthy && isDataPriceTruthy && isDataClientTruthy;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const orders = Object.entries(formData).map(([key, { order, price }]) => ({
      _id: key,
      order: Number(order),
      price: Number(price),
    }));

    const order = {
      date: dateData.toISOString(),
      client: clientData._id,
      order: orders,
      location: locationData._id,
      message: messageData,
    };

    dispatch(
      postOrder({
        order,
        success: () => {
          toast.success("Заказ успешно добавлен");
          dispatch(resetFormData());
          dispatch(resetProducts());
          resetSelect();
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form-header">
          <ClientButton />
          <DatePickerComponent />

          <button
            type="submit"
            className="order-submit-btn"
            disabled={!isOrderTruthy()}
          >
            Добавить <br /> в базу
          </button>
        </div>

        {Object.entries(formData).length === 0 ? (
          <OrderFormButtonsGroup />
        ) : (
          <>
            <div className="form-body">
              <Inputs
                category="poultry"
                list={productsSelected}
                renderProducts={({ _id, title, img }) => (
                  <OrderFormGroup
                    key={_id}
                    id={_id}
                    title={title}
                    img={img}
                    onFocusOrder={onFocusOrder}
                    onBlurOrder={onBlurOrder}
                    onFocusPrice={onFocusPrice}
                    onBlurPrice={onBlurPrice}
                  />
                )}
              />
              <Inputs
                category="food"
                list={productsSelected}
                renderProducts={({ _id, title, img }) => (
                  <OrderFormGroup key={_id} id={_id} title={title} img={img} />
                )}
              />
              <Inputs
                category="other"
                list={productsSelected}
                renderProducts={({ _id, title, img }) => (
                  <OrderFormGroup key={_id} id={_id} title={title} img={img} />
                )}
              />

              <Summary title="Всего по заказу: " />
            </div>
            <HistoryButtons
              onClickHistoryPriceButton={onClickHistoryPriceButton}
              priceHitory={priceHitory}
              setPriceHistory={setPriceHistory}
              historyButtonOrder={historyButtonOrder}
              onClickHistoryOrderButton={onClickHistoryOrderButton}
            />
          </>
        )}
      </form>
      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
}
