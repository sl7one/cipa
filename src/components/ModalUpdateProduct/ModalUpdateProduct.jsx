import React, { useContext } from "react";
import "./update-product.scss";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Product } from "../../context/products-context";
import { animationsHelper } from "../../utils/animationsHelper";

export default function ModalUpdateProduct() {
  const { editProduct } = animationsHelper;
  const { product, setProduct } = useContext(Product);
  const isLoading = useSelector((state) => state.products.isLoading);

  const onSubmit = () => {};

  return (
    <>
      {isLoading ? (
        <Loader isVisible={isLoading} />
      ) : (
        <div className="update-product-backdrop">
          <form className="update-product" onSubmit={onSubmit}>
            <div className="left">
              <div className="form__input-wrapper">
                <label htmlFor="name"></label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={product?.title || ""}
                  placeholder="Название продукта"
                  onChange={({ target: { name, value } }) =>
                    setProduct((prev) => ({ ...prev, [name]: value }))
                  }
                />
              </div>
              <div className="form__input-wrapper">
                <label htmlFor="phone"></label>
                <input
                  id="img"
                  type="text"
                  name="img"
                  value={product?.img || ""}
                  placeholder="URL картинки"
                  onChange={({ target: { name, value } }) =>
                    setProduct((prev) => ({ ...prev, [name]: value }))
                  }
                />
              </div>

              <div className="form__input-wrapper">
                <label htmlFor="price"></label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={
                    product?.category === "poultry" ? "" : product?.price || 0
                  }
                  placeholder={
                    product?.category === "poultry"
                      ? "Не активно"
                      : "Цена продукта"
                  }
                  onChange={({ target: { name, value } }) =>
                    setProduct((prev) => ({ ...prev, [name]: value }))
                  }
                  disabled={product?.category === "poultry"}
                />
              </div>
            </div>
            <div className="right"></div>
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
