import React from "react";
import OrderFormImage from "../OrderFormImage/OrderFormImage";
import OrderFormDeleteBtn from "../OrderFormDeleteBtn/OrderFormDeleteBtn";
import OrderFormInputField from "../OrderFormInputField/OrderFormInputField";
import OrderFormInputSummary from "../OrderFormInputSummary/OrderFormInputSummary";

export default function OrderFormGroup({ _id, title, img, total }) {
  return (
    <div key={_id} className="form__field">
      <OrderFormImage img={img} title={title} />
      <div className="form__input">
        <OrderFormDeleteBtn id={_id} />
        <p>{title}</p>
        <OrderFormInputField
          _id={_id}
          inputKey="quantity"
          placeholder="кол-во"
          unit="шт "
        />
        <OrderFormInputField
          _id={_id}
          inputKey="price"
          placeholder="цена"
          unit="грн"
        />
        <OrderFormInputSummary _id={_id} total={total} />
      </div>
    </div>
  );
}
