import React, { useContext, useMemo } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { resetProductForm, setProductForm } from "../../store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../context/toast-context";
import { addNewSubCategory } from "../../store/subCategoriesActions";
import { addNewSub2Category } from "../../store/sub2CategoriesActions";
import { updateProduct } from "../../store/productsActions";
import { selectStyles } from "../../utils/selectStyles";
import { addNewCategory } from "../../store/categoriesActions";
import "./update-product.scss";
import BackBtn from "../BackBtn/BackBtn";

const ButtonSubmit = () => {
  return (
    <button className="update-product-submit" type="submit">
      Изменить
    </button>
  );
};

const Buttons = () => {
  return (
    <div className="update-product-btns">
      <ButtonSubmit />
      <BackBtn path="/products" title="Вернуться" />
    </div>
  );
};

const Category = ({ inputKey, idx, fn, list }) => {
  const { id: _id } = useParams();
  const productsData = useSelector((state) => state.products.products);

  const product = useMemo(
    () => productsData.find((el) => el._id === _id),
    [_id, productsData]
  );

  return (
    <div className="categories-wrapper">
      <span>{++idx + "."}</span>
      <Select
        defaultValue={{
          label: product[inputKey],
          value: product[inputKey],
        }}
        options={list.map((el) => ({
          label: <span style={{ textTransform: "capitalize" }}>{el.name}</span>,
          value: el,
        }))}
        placeholder="Категория"
        styles={selectStyles()}
        onChange={fn}
      />
    </div>
  );
};

export default function UpdateProductForm() {
  const navigate = useNavigate();
  const toast = useContext(Toast);
  const productForm = useSelector((state) => state.products.productForm);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2Categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );

  const dispatch = useDispatch();
  const { category, subCategory = null, sub2Category = null } = productForm;

  const onChangeCategory = (e) => {
    if (!e) {
      dispatch(setProductForm({ category: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewCategory({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая категория");
            dispatch(setProductForm({ category: newCategory._id }));
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    dispatch(
      setProductForm({
        category: e.value._id,
      })
    );
  };

  const onChangeSubCategory = (e) => {
    if (!e) {
      dispatch(setProductForm({ subCategory: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewSubCategory({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая подкатегория");
            dispatch(setProductForm({ subCategory: newCategory._id }));
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    dispatch(
      setProductForm({
        subCategory: e.value._id,
      })
    );
  };

  const onChangeSub2Category = (e) => {
    if (!e) {
      dispatch(setProductForm({ sub2Category: "" }));
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewSub2Category({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая подкатегория");
            dispatch(setProductForm({ sub2Category: newCategory._id }));
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    dispatch(
      setProductForm({
        sub2Category: e.value._id,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        data: productForm,
        success: () => {
          toast.success("Продукт успешно изменен");
          dispatch(resetProductForm());
          navigate("/products");
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <form className="update-product" onSubmit={onSubmit}>
      <span>Категория</span>

      <div className="categories">
        {[
          {
            _id: category,
            key: "category",
            fn: onChangeCategory,
            list: categories,
          },
          {
            _id: subCategory,
            key: "subCategory",
            fn: onChangeSubCategory,
            list: subCategories,
          },
          {
            _id: sub2Category,
            key: "sub2Category",
            fn: onChangeSub2Category,
            list: sub2Categories,
          },
        ]
          .filter((el) => el._id)
          .map(({ key, list, fn }, idx) => (
            <Category key={key} idx={idx} inputKey={key} list={list} fn={fn} />
          ))}
      </div>
      <div className="body">
        <div className="body__input-wrapper">
          <label htmlFor="title">Наименование</label>
          <input
            id="title"
            type="text"
            name="title"
            value={productForm?.title || ""}
            placeholder="Название продукта"
            onChange={({ target: { name, value } }) =>
              dispatch(setProductForm({ [name]: value }))
            }
          />
        </div>
        <div className="body__input-wrapper">
          <label htmlFor="img">Картинка</label>
          <input
            id="img"
            type="text"
            name="img"
            value={productForm?.img || ""}
            placeholder="URL картинки"
            onChange={({ target: { name, value } }) =>
              dispatch(setProductForm({ [name]: value }))
            }
          />
        </div>
        <div className="body__input-wrapper">
          <label htmlFor="price">Цена, грн.</label>
          <input
            id="price"
            type="number"
            name="price"
            value={
              productForm?.category === "птица" ? "" : productForm?.price || ""
            }
            placeholder={
              productForm?.category === "птица" ? "Не активно" : "Цена продукта"
            }
            onChange={({ target: { name, value } }) =>
              dispatch(setProductForm({ [name]: Number(value) }))
            }
            disabled={productForm?.category === "птица"}
          />
        </div>
      </div>

      <Buttons />
    </form>
  );
}
