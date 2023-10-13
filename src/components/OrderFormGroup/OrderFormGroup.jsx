import React from "react";
import OrderFormImage from "../OrderFormImage/OrderFormImage";
import OrderFormDeleteBtn from "../OrderFormDeleteBtn/OrderFormDeleteBtn";
import OrderFormInputField from "../OrderFormInputField/OrderFormInputField";
import OrderFormInputSummary from "../OrderFormInputSummary/OrderFormInputSummary";

export default function OrderFormGroup({
  id,
  title,
  img,
  onFocusOrder = () => {},
  onBlurOrder = () => {},
  onFocusPrice = () => {},
  onBlurPrice = () => {},
}) {
  return (
    <div key={id} className="form__field">
      <OrderFormImage img={img} title={title} />
      <div className="form__input">
        <OrderFormDeleteBtn id={id} />
        <p>{title}</p>
        <OrderFormInputField
          id={id}
          inputKey="order"
          placeholder="кол-во"
          onFocus={onFocusOrder}
          onBlur={onBlurOrder}
          unit="шт "
        />
        <OrderFormInputField
          id={id}
          inputKey="price"
          placeholder="цена"
          onFocus={onFocusPrice}
          onBlur={onBlurPrice}
          unit="грн"
        />
        <OrderFormInputSummary id={id} />
      </div>
    </div>
  );
}
