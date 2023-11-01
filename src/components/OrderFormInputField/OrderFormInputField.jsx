import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputsData } from "../../store/ordersSlice";

export default function OrderFormInputField({
  _id,
  placeholder,
  unit,
  inputKey,
}) {
  const ordersData = useSelector((state) => state.orders.orderForm.ordersData);
  const dispatch = useDispatch();

  return (
    <div className="form__input-wrapper">
      <input
        className={`form__input ${inputKey}`}
        type="number"
        value={ordersData[_id]?.[inputKey] ? ordersData[_id][inputKey] : ""}
        onChange={({ target: { value } }) =>
          dispatch(setInputsData({ [_id]: { [inputKey]: value } }))
        }
        placeholder={placeholder}
      />
      <label htmlFor={_id}>{unit}</label>
    </div>
  );
}
