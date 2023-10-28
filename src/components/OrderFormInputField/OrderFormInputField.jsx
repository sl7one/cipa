import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../store/ordersSlice";

export default function OrderFormInputField({
  id,
  onFocus,
  onBlur,
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
        // name={id}
        value={ordersData[id]?.[inputKey] ? ordersData[id][inputKey] : ""}
        onChange={({ target: { value } }) =>
          dispatch(setOrder({ [id]: { [inputKey]: value } }))
        }
        placeholder={placeholder}
        // onFocus={() => onFocus(id)}
        // onBlur={onBlur}
      />
      <label htmlFor={id}>{unit}</label>
    </div>
  );
}
