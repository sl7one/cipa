import React from "react";
import { useSelector } from "react-redux";

export default function OrderFormInputSummary({ id }) {
  const formData = useSelector((state) => state.form.formData);
  return (
    <div className="form__input-wrapper">
      <input
        type="number"
        className="form__input total"
        name={id}
        value={
          formData[id]?.price && formData[id]?.order
            ? formData[id].price * formData[id].order
            : 0
        }
        readOnly
      />
      <label htmlFor={id}>грн</label>
    </div>
  );
}
