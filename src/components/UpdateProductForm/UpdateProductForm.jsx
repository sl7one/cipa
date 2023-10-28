import React, { useContext, useMemo } from "react";
import CreatableSelect from "react-select/creatable";
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

export default function UpdateProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useContext(Toast);
  const productForm = useSelector((state) => state.products.productForm);
  const productsData = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );
  const product = useMemo(
    () => productsData.find((el) => el._id === id),
    [id, productsData]
  );
  const dispatch = useDispatch();

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
      <div className="categories">
        <div className="categories-wrapper">
          <span>Категория 1</span>
          <CreatableSelect
            isClearable
            isSearchable
            defaultValue={{
              label: product.category,
              value: product.category,
            }}
            options={categories.map((el) => ({
              label: (
                <span style={{ textTransform: "capitalize" }}>{el.name}</span>
              ),
              value: el,
            }))}
            placeholder="Категория"
            styles={selectStyles()}
            onChange={onChangeCategory}
          />
        </div>
        <div className="categories-wrapper">
          <span>Категория 2</span>
          <CreatableSelect
            isClearable
            isSearchable
            defaultValue={{
              label: product.subCategory,
              value: product.subCategory,
            }}
            options={subCategories.map((el) => ({
              label: (
                <span style={{ textTransform: "capitalize" }}>{el.name}</span>
              ),
              value: el,
            }))}
            placeholder="Подкатегория"
            styles={selectStyles()}
            onChange={onChangeSubCategory}
          />
        </div>
        <div className="categories-wrapper">
          <span>Категория 3</span>
          <CreatableSelect
            isClearable
            isSearchable
            defaultValue={{
              label: product?.sub2Category || null,
              value: product?.sub2Category || null,
            }}
            options={sub2categories.map((el) => ({
              label: (
                <span style={{ textTransform: "capitalize" }}>{el.name}</span>
              ),
              value: el,
            }))}
            placeholder="Подкатегория 2"
            styles={selectStyles()}
            onChange={onChangeSub2Category}
          />
        </div>
      </div>
      <div className="body">
        <div className="form__input-wrapper">
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
        <div className="form__input-wrapper">
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
        <div className="form__input-wrapper">
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

      <div className="update-product-buttons">
        <button className="update-product-submit" type="submit">
          Изменить
        </button>
      </div>
    </form>
  );
}
