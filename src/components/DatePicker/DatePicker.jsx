import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.scss";

import { setDefaultLocale, registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../store/formDataSlice";
registerLocale("ru", ru);
setDefaultLocale("ru");

export default function DatePickerComponent({ startDate, setStartDate }) {
  const dispatch = useDispatch();
  const dateData = useSelector((state) => state.form.date);

  const CustomButton = forwardRef(({ value, onClick }, ref) => (
    <button
      className="date-picker-btn"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <span>Дата:</span>
      <span style={{ fontWeight: 600 }}> {value}</span>
    </button>
  ));
  return (
    <div style={{ flex: 1 }}>
      <DatePicker
        dateFormat="dd.MM.yy"
        withPortal
        locale="ru"
        selected={dateData}
        onChange={(date) => dispatch(setDate(date))}
        customInput={<CustomButton />}
      />
    </div>
  );
}
