import React, { useContext, useEffect, useRef } from "react";
import "./update-product.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Product } from "../../context/products-context";
import { animationsHelper } from "../../utils/animationsHelper";
import { selectStyles } from "../../utils/selectStyles";
import CreatableSelect from "react-select/creatable";
import { addNewCategory } from "../../store/categoriesActions";
import { Toast } from "../../context/toast-context";
import { addNewSubCategory } from "../../store/subCategoriesActions";
import { addNewSub2Category } from "../../store/sub2CategoriesActions";
import { updateProduct } from "../../store/productsActions";
import useSelectContext from "../../hooks/useSelectContext";

export default function ModalUpdateProduct() {
  const toast = useContext(Toast);
  const refCategory = useRef(null);
  const refSubCategory = useRef(null);
  const refSub2Category = useRef(null);
  const { setRef } = useSelectContext();

  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );
  const dispatch = useDispatch();
  const { editProduct } = animationsHelper;
  const { product, setProduct } = useContext(Product);

  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    setRef([refCategory, refSubCategory, refSub2Category]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCategory, refSubCategory, refSub2Category]);

  const onChangeCategory = (e) => {
    if (!e) {
      setProduct({ category: "" });
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewCategory({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая категория");
            setProduct({ category: newCategory._id });
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    setProduct({
      category: e.value._id,
    });
  };

  const onChangeSubCategory = (e) => {
    if (!e) {
      setProduct({ subCategory: "" });
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewSubCategory({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая подкатегория");
            setProduct({ subCategory: newCategory._id });
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    setProduct({
      subCategory: e.value._id,
    });
  };

  const onChangeSub2Category = (e) => {
    if (!e) {
      setProduct({ sub2Category: "" });
      return;
    }

    if (e.__isNew__) {
      dispatch(
        addNewSub2Category({
          data: { name: e.value },
          success: (newCategory) => {
            toast.success("Добавлена новая подкатегория");
            setProduct({ sub2Category: newCategory._id });
          },
          failed: (message) => toast.error(message),
        })
      );

      return;
    }

    setProduct({
      sub2Category: e.value._id,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    dispatch(
      updateProduct({
        data: product,
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
      {isLoading ? (
        <Loader isVisible={isLoading} />
      ) : (
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
                  label: product.subCategory,
                  value: product.subCategory,
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
                  label: product?.sub2Category || null,
                  value: product?.sub2Category || null,
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
                  value={product?.title || ""}
                  placeholder="Название продукта"
                  onChange={({ target: { name, value } }) =>
                    setProduct({ [name]: value })
                  }
                />
              </div>
              <div className="form__input-wrapper">
                <label htmlFor="img">Картинка</label>
                <input
                  id="img"
                  type="text"
                  name="img"
                  value={product?.img || ""}
                  placeholder="URL картинки"
                  onChange={({ target: { name, value } }) =>
                    setProduct({ [name]: value })
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
                    product?.category === "Птица" ? "" : product?.price || ""
                  }
                  placeholder={
                    product?.category === "Птица"
                      ? "Не активно"
                      : "Цена продукта"
                  }
                  onChange={({ target: { name, value } }) =>
                    setProduct({ [name]: Number(value) })
                  }
                  disabled={product?.category === "Птица"}
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
      )}
    </>
  );
}
