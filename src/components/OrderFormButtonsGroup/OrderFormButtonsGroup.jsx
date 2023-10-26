import React, { useEffect } from "react";
import { animationsHelper } from "../../utils/animationsHelper";
import gsap from "gsap";
import "./order-form-btns-group.scss";
import BackBtn from "../BackBtn/BackBtn";

export default function OrderFormButtonsGroup() {
  const { productModal } = animationsHelper;

  useEffect(() => {
    gsap.fromTo(
      ".add-product",
      {
        opacity: 0,
        left: "-100%",
      },
      {
        opacity: 1,
        left: 0,
      }
    );
    gsap.fromTo(
      ".back-link",
      {
        opacity: 0,
        right: "-100%",
      },
      {
        opacity: 1,
        right: 0,
      }
    );
  }, []);

  return (
    <>
      <button className="add-product" type="button" onClick={productModal.show}>
        Добавить товары
      </button>
      <BackBtn path="/orders" />
    </>
  );
}
