import React, { useEffect } from "react";
import "./product-modal.scss";
import { useDispatch, useSelector } from "react-redux";
import useSelectedProducts from "../../hooks/useSelectedProducts";
import {
  setSelectedProducts,
  unsetSelectedProducts,
} from "../../store/productsSlice";
import { isItemSelectedHelper } from "../../utils/isItemSelected";
import { animationsHelper } from "../../utils/animationsHelper";
import gsap from "gsap";

const ButtonChoose = ({ onClickChoose, productsSelected }) => {
  useEffect(() => {
    gsap.fromTo(
      ".button-choose",
      {
        bottom: "-100",
        opacity: 0,
      },
      {
        bottom: 0,
        opacity: 1,
        onComplete: () =>
          gsap.to(".product-list", { height: "calc(100% - 42px)" }),
      }
    );

    return () => gsap.to(".product-list", { height: "100vh" });
  }, []);
  return (
    <button type="button" className="button-choose" onClick={onClickChoose}>
      Выбрать
      <span>{productsSelected.length}</span>
    </button>
  );
};

const ModalProduct = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const productsSelected = useSelectedProducts(products);
  const { productModal } = animationsHelper;

  useEffect(() => {
    if (!products.length) return;
    products.forEach(({ isSelected, _id }) => {
      isSelected
        ? productModal.itemOverlay.show("id" + _id)
        : productModal.itemOverlay.hide("id" + _id);
    });
  }, [products, productModal]);

  const onClickProduct = (id) => {
    const isItemSelected = isItemSelectedHelper({ products, id });
    isItemSelected
      ? dispatch(unsetSelectedProducts(id))
      : dispatch(setSelectedProducts(id));
  };

  const onClickChoose = () => {
    productModal.hide();
  };

  return (
    <div className="product-modal">
      <ul className="product-list">
        {products.map(({ _id, img, title }) => (
          <li key={_id}>
            <button type="button" onClick={() => onClickProduct(_id)}>
              <span id={"id" + _id}>{title}</span>
              <div className="thumb">
                <img src={img} alt={title} />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {productsSelected.length !== 0 && (
        <ButtonChoose
          onClickChoose={onClickChoose}
          productsSelected={productsSelected}
        />
      )}
    </div>
  );
};

export default ModalProduct;
