import React from "react";
import "./products-list.scss";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const productsData = useSelector((state) => state.products.products);

  return (
    <ul className="products-list">
      {productsData.map(({ _id, title, img, price = 0 }, idx) => (
        <li className="products-item" key={++idx}>
          <span className="products-item__number">{++idx + "."}</span>
          <div className="thumb">
            <img src={img} alt={title} width={100} height={100} />
          </div>
          <span className="products-item__title">{title}</span>
          <span className="products--item__price">{price + "грн."}</span>
          <Link to={`edit/${_id}`}>
            <Icons name="edit" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
