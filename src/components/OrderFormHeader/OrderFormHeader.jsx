import React from "react";
import DatePickerComponent from "../DatePicker/DatePicker";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import AddToDatabaseBtn from "../AddToDatabaseBtn/AddToDatabaseBtn";
import "./form-header.scss";

export default function OrderFormHeader({ children }) {
  return (
    <>
      <div className="form-header">
        {children}
        <DatePickerComponent />
        <AddNewProduct />
      </div>
      <AddToDatabaseBtn />
    </>
  );
}
