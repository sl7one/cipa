import React, { useEffect, useState } from "react";
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
import ModalFailed from "../ModalFailed/ModalFailed";
import { animationsHelper } from "../../utils/animationsHelper";
import OrderFormButtonsGroup from "../OrderFormButtonsGroup/OrderFormButtonsGroup";

export default function ModalOrder({ productsSelected }) {
  const [historyButtonOrder, setHistoryButtonOrder] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);
  const formData = useSelector((state) => state.form.formData);
  const clientData = useSelector((state) => state.form.clientData);

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
      product: key,
      order: Number(order),
      price: Number(price),
    }));

    const order = {
      date: startDate.toISOString(),
      client: clientData,
      order: orders,
    };

    dispatch(
      postOrder({
        order,
        success: () => {
          dispatch(resetFormData());
          dispatch(resetProducts());
        },
        failed: () => console.log("failed clg"),
      })
    );
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form-header">
          <ClientButton />
          <DatePickerComponent
            startDate={startDate}
            setStartDate={setStartDate}
          />

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
      <ModalFailed errorObj={error} />
    </>
  );
}
