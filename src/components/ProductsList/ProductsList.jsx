import React, { useContext, useState } from "react";
import "./products-list.scss";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { Link } from "react-router-dom";
import { List, arrayMove } from "react-movable";
import { Toast } from "../../context/toast-context";
import { updateSortIndex } from "../../store/productsActions";

export default function ProductsList() {
  const [items, setItems] = useState(
    useSelector((state) => state.products.products)
  );
  const dispatch = useDispatch();
  const toast = useContext(Toast);

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) => {
        dispatch(
          updateSortIndex({
            data: {
              less: { productId: items[oldIndex]._id, sortIndex: oldIndex },
              more: { productId: items[newIndex]._id, sortIndex: newIndex },
            },
            success: () => {
              setItems(arrayMove(items, oldIndex, newIndex));
              toast.success("Прядок успешно изменен");
            },
            failed: (message) => toast.error(message),
          })
        );
      }}
      renderList={({ children, props }) => (
        <ul className="products-list" {...props}>
          {children}
        </ul>
      )}
      renderItem={({
        value: {
          img,
          title,
          category,
          subCategory,
          sub2Category,
          price = 0,
          _id,
        },
        props,
        index,
      }) => {
        return (
          <li className="products-item" {...props}>
            <span className="products-item__number">{++index + "."}</span>
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
        );
      }}
    />
  );
}
