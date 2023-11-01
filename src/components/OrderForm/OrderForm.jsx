import React, { useContext, useEffect } from "react";
import "./order-form.scss";
import { useDispatch, useSelector } from "react-redux";
import Inputs from "../Inputs/Inputs";
import OrderFormGroup from "../OrderFormGroup/OrderFormGroup";
import Summary from "../Summary/Summary";
import { resetProducts } from "../../store/productsSlice";
import { postOrder } from "../../store/ordersActions";
import Loader from "../Loader/Loader";
import { Toast } from "../../context/toast-context";
import { Select } from "../../context/select-context";
import {
  initFormData,
  resetClienData,
  resetLocation,
  resetMessage,
  resetOrder,
} from "../../store/ordersSlice";
import OrderPoultryFunctionBtn from "../OrderPoultryFunctionBtn/OrderPoultryFunctionBtn";
import OrderFormHeader from "../OrderFormHeader/OrderFormHeader";

export default function ModalOrder({ productsSelected }) {
  const toast = useContext(Toast);
  const { resetSelect } = useContext(Select);

  const isLoading = useSelector((state) => state.orders.isLoading);
  const owner = useSelector((state) => state.auth.user._id);
  const {
    clientData,
    date: dateData,
    location: locationData,
    message: messageData,
    ordersData,
  } = useSelector((state) => state.orders.orderForm);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productsSelected.length) return;
    dispatch(initFormData({ productsSelected }));
  }, [productsSelected, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const orders = Object.entries(ordersData).map(
      ([key, { order, price }]) => ({
        _id: key,
        order: Number(order),
        price: Number(price),
      })
    );

    const order = {
      date: dateData.toISOString(),
      client: clientData._id,
      order: orders,
      location: locationData._id,
      message: messageData,
      owner,
    };

    dispatch(
      postOrder({
        data: order,
        success: () => {
          toast.success("Заказ успешно добавлен");
          dispatch(resetOrder());
          dispatch(resetLocation());
          dispatch(resetClienData());
          dispatch(resetMessage());
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
        <OrderFormHeader />
        <>
          <div className="form-body">
            <Inputs
              list={productsSelected.filter(
                ({ category }) => category === "птица"
              )}
              renderProducts={({ _id, title, img }) => (
                <OrderFormGroup key={_id} id={_id} title={title} img={img} />
              )}
            >
              <OrderPoultryFunctionBtn />
            </Inputs>
            <Inputs
              list={productsSelected.filter(
                ({ category }) => category === "корм"
              )}
              renderProducts={({ _id, title, img }) => (
                <OrderFormGroup key={_id} id={_id} title={title} img={img} />
              )}
            />
            <Inputs
              list={productsSelected.filter(
                ({ category }) => category === "дополнительно"
              )}
              renderProducts={({ _id, title, img }) => (
                <OrderFormGroup key={_id} id={_id} title={title} img={img} />
              )}
            />
            <Summary />
          </div>
        </>
      </form>
      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
}
