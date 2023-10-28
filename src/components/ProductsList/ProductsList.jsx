import React from "react";
import "./products-list.scss";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const productsData = useSelector((state) => state.products.products);

  return (
    <ul className="products-list">
      {productsData.map(
        (
          {
            _id,
            title,
            img,
            price = 0,
            category,
            subCategory = "",
            sub2Category = "",
          },
          idx
        ) => (
          <li className="products-item" key={++idx}>
            <span className="products-item__number">{++idx + "."}</span>
            <div className="thumb">
              <img
                src={img}
                alt={title}
                width={100}
                height={100}
                loading="lazy"
              />
            </div>
            <div className="products-item__title-group">
              <span className="products-item__title">{title}</span>
              <span className="products-item__category">{category}</span>
              {subCategory && (
                <span className="products-item__sub-category">
                  {subCategory}
                </span>
              )}
              {sub2Category && (
                <span className="products-item__sub-2-category">
                  {sub2Category}
                </span>
              )}
            </div>
            <span className="products--item__price">{price + "грн."}</span>
            <Link to={`edit/${_id}`}>
              <Icons name="edit" />
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
