import React, { useContext } from "react";
import "./products-list.scss";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { Product } from "../../context/products-context";

export default function ProductsList() {
  const { setProduct } = useContext(Product);
  const { editProduct } = animationsHelper;
  const productsData = useSelector((state) => state.products.products);

  const onClickEdit = (product) => {
    editProduct.show();
    setProduct(product);
  };
  return (
    <ul className="products-list">
      {productsData.map(({ _id, title, img, category, ...rest }, idx) => (
        <li className="products-item" key={++idx}>
          <span className="products-item__number">{++idx + "."}</span>
          <div className="thumb">
            <img src={img} alt={title} width={100} height={100} />
          </div>
          <span>{title}</span>
          <button
            type="button"
            onClick={() => onClickEdit({ _id, title, img, category, ...rest })}
          >
            <Icons name="edit" />
          </button>
        </li>
      ))}
    </ul>
  );
}
