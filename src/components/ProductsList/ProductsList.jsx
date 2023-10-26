import React, { useContext } from "react";
import "./products-list.scss";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import { setProductForm } from "../../store/productsSlice";
import { Select } from "../../context/select-context";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { setValue } = useContext(Select);
  const { editProduct } = animationsHelper;
  const productsData = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2Categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );

  const onClickEdit = ({ category, subCategory, sub2Category, ...rest }) => {
    dispatch(
      setProductForm({
        category: categories.find((el) => el.name === category)._id,
        subCategory:
          subCategories.find((el) => el.name === subCategory)?._id || "",
        sub2Category:
          sub2Categories.find((el) => el.name === sub2Category)?._id || "",
        ...rest,
      })
    );
    setValue({ idx: 0, value: 25 });

    if (subCategory) {
      setValue({ idx: 1, value: subCategory });
    }
    if (sub2Category) {
      setValue({ idx: 2, value: sub2Category });
    }
    editProduct.show();
  };

  return (
    <ul className="products-list">
      {productsData.map(({ _id, title, img }, idx) => (
        <li className="products-item" key={++idx}>
          <span className="products-item__number">{++idx + "."}</span>
          <div className="thumb">
            <img src={img} alt={title} width={100} height={100} />
          </div>
          <span>{title}</span>
          <Link to={`edit/${_id}`}>
            <Icons name="edit" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
