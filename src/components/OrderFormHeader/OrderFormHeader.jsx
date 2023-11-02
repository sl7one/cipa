import React from "react";
import ClientButton from "../ClientButton/ClientButton";
import DatePickerComponent from "../DatePicker/DatePicker";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import AddToDatabaseBtn from "../AddToDatabaseBtn/AddToDatabaseBtn";
import "./form-header.scss";

export default function OrderFormHeader() {
  return (
    <>
      <div className="form-header">
        <ClientButton />
        <DatePickerComponent />
        <AddNewProduct />
      </div>
      <AddToDatabaseBtn />
    </>
  );
}
