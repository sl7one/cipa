import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../store/formDataSlice";

export default function OrderFormInputField({
  id,
  onFocus,
  onBlur,
  placeholder,
  unit,
  inputKey,
}) {
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();

  console.log(formData);

  return (
    <div className="form__input-wrapper">
      <input
        className={`form__input ${inputKey}`}
        type="number"
        name={id}
        value={formData[id]?.[inputKey] ? formData[id][inputKey] : ""}
        onChange={({ target: { name, value } }) =>
          dispatch(setFormData({ [name]: { [inputKey]: value } }))
        }
        placeholder={placeholder}
        onFocus={() => onFocus(id)}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{unit}</label>
    </div>
  );
}
