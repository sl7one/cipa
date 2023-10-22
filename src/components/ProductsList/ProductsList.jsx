import React, { useContext } from "react";
import "./products-list.scss";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { Product } from "../../context/products-context";
import { Select } from "../../context/select-context";

export default function ProductsList() {
  const { setProduct } = useContext(Product);
  const { setValue } = useContext(Select);
  const { editProduct } = animationsHelper;
  const productsData = useSelector((state) => state.products.products);

  const onClickEdit = (product) => {
    setProduct(product);
    setValue({ idx: 0, value: product.category });

    if (product.subCategory) {
      setValue({ idx: 1, value: product.subCategory });
    }
    if (product.sub2Category) {
      setValue({ idx: 2, value: product.sub2Category });
    }
    editProduct.show();
  };

  return (
    <ul className="products-list">
      {productsData.map(({ _id, title, img, ...rest }, idx) => (
        <li className="products-item" key={++idx}>
          <span className="products-item__number">{++idx + "."}</span>
          <div className="thumb">
            <img src={img} alt={title} width={100} height={100} />
          </div>
          <span>{title}</span>
          <button
            type="button"
            onClick={() => onClickEdit({ _id, title, img, ...rest })}
          >
            <Icons name="edit" />
          </button>
        </li>
      ))}
    </ul>
  );
}
