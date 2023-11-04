import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { animationsHelper } from "../../utils/animationsHelper";
import { selectStyles } from "../../utils/selectStyles";
import CreatableSelect from "react-select/creatable";
import { addNewCategory } from "../../store/categoriesActions";
import { Toast } from "../../context/toast-context";
import { addNewSubCategory } from "../../store/subCategoriesActions";
import { addNewSub2Category } from "../../store/sub2CategoriesActions";
import { updateProduct } from "../../store/productsActions";
import { setProductForm } from "../../store/productsSlice";
import { Select } from "../../context/select-context";

export default function ModalUpdateProduct() {
  const toast = useContext(Toast);
  const { setRef } = useContext(Select);
  const refCategory = useRef(null);
  const refSubCategory = useRef(null);
  const refSub2Category = useRef(null);

  useEffect(() => {
    setRef([refCategory, refSubCategory, refSub2Category]);
  }, [refCategory, refSubCategory, refSub2Category, setRef]);

  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );
  const dispatch = useDispatch();
  const { editProduct } = animationsHelper;
  const productForm = useSelector((state) => state.products.productForm);

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
          editProduct.hide();
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
 
        <div className="update-product-backdrop">
          <form className="update-product" onSubmit={onSubmit}>
            <div className="categories">
              <CreatableSelect
                ref={refCategory}
                isClearable
                isSearchable
                options={categories.map((el) => ({
                  label: (
                    <span style={{ textTransform: "capitalize" }}>
                      {el.name}
                    </span>
                  ),
                  value: el,
                }))}
                placeholder="Категория"
                styles={selectStyles()}
                onChange={onChangeCategory}
              />
              <CreatableSelect
                ref={refSubCategory}
                isClearable
                isSearchable
                defaultValue={{
                  label: productForm.subCategory,
                  value: productForm.subCategory,
                }}
                options={subCategories.map((el) => ({
                  label: (
                    <span style={{ textTransform: "capitalize" }}>
                      {el.name}
                    </span>
                  ),
                  value: el,
                }))}
                placeholder="Подкатегория"
                styles={selectStyles()}
                onChange={onChangeSubCategory}
              />
              <CreatableSelect
                ref={refSub2Category}
                isClearable
                isSearchable
                defaultValue={{
                  label: productForm?.sub2Category || null,
                  value: productForm?.sub2Category || null,
                }}
                options={sub2categories.map((el) => ({
                  label: (
                    <span style={{ textTransform: "capitalize" }}>
                      {el.name}
                    </span>
                  ),
                  value: el,
                }))}
                placeholder="Подкатегория 2"
                styles={selectStyles()}
                onChange={onChangeSub2Category}
              />
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
                    setProductForm({ [name]: value })
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
                    setProductForm({ [name]: value })
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
                    productForm?.category === "Птица"
                      ? ""
                      : productForm?.price || ""
                  }
                  placeholder={
                    productForm?.category === "Птица"
                      ? "Не активно"
                      : "Цена продукта"
                  }
                  onChange={({ target: { name, value } }) =>
                    setProductForm({ [name]: Number(value) })
                  }
                  disabled={productForm?.category === "Птица"}
                />
              </div>
            </div>

            <div className="update-product-buttons">
              <button
                className="update-product-close"
                type="button"
                onClick={editProduct.hide}
              >
                Закрыть
              </button>
              <button className="update-product-submit" type="submit">
                Изменить
              </button>
            </div>
          </form>
        </div>
    </>
  );
}
