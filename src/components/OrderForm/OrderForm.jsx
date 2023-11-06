import React, { useEffect } from "react";
import "./order-form.scss";
import { useDispatch, useSelector } from "react-redux";
import Inputs from "../Inputs/Inputs";
import OrderFormGroup from "../OrderFormGroup/OrderFormGroup";
import Summary from "../Summary/Summary";
import OrderPoultryFunctionBtn from "../OrderPoultryFunctionBtn/OrderPoultryFunctionBtn";
import OrderFormHeader from "../OrderFormHeader/OrderFormHeader";
import BackBtn from "../BackBtn/BackBtn";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import { initFormData } from "../../store/ordersSlice";

export default function OrderForm({ productsSelected, onSubmit }) {
  const { ordersData } = useSelector((state) => state.orders.orderForm);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productsSelected.length) return;
    dispatch(initFormData({ productsSelected }));
  }, [productsSelected, dispatch]);

  const productsFiltredByCategory = (currentCategory) => {
    return productsSelected.filter(
      ({ category }) => category === currentCategory
    );
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <OrderFormHeader />
        <>
          {!productsSelected.length ? (
            <div className="back-block">
              <AddNewProduct />
              <BackBtn path="/orders" title="Верунться к заказам" />
            </div>
          ) : (
            <div className="form-body">
              <Inputs
                list={productsFiltredByCategory("птица")}
                renderProducts={(props) => (
                  <OrderFormGroup key={props._id} {...props} />
                )}
              >
                <OrderPoultryFunctionBtn />
              </Inputs>
              <Inputs
                list={productsFiltredByCategory("корм")}
                renderProducts={(props) => (
                  <OrderFormGroup key={props._id} {...props} />
                )}
              />
              <Inputs
                list={productsFiltredByCategory("дополнительно")}
                renderProducts={(props) => (
                  <OrderFormGroup key={props._id} {...props} />
                )}
              />
              <Summary data={ordersData} />
            </div>
          )}
        </>
      </form>
    </>
  );
}
