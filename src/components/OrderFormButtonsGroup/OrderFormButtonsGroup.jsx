import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import gsap from "gsap";
import "./order-form-btns-group.scss";

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
      ".link-to-orders",
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
      <Link className="link-to-orders" to="/orders">
        <Icons name="back" />
      </Link>
    </>
  );
}
