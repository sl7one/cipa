import React from "react";
import { animationsHelper } from "../../utils/animationsHelper";
import "./add-new-roduct.scss";

export default function AddNewProduct() {
  const { productModal } = animationsHelper;

  return (
    <button className="add-product" type="button" onClick={productModal.show}>
      Добавить <br /> товары
    </button>
  );
}
