import React, { useEffect, useMemo } from "react";
import Loader from "../components/Loader/Loader";
import BackBtn from "../components/BackBtn/BackBtn";
import UpdateProductForm from "../components/UpdateProductForm/UpdateProductForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProductForm } from "../store/productsSlice";

export default function EditProductPage() {
  const { id } = useParams();
  const productsData = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const sub2categories = useSelector(
    (state) => state.sub2categories.sub2categories
  );

  const dispatch = useDispatch();

  const product = useMemo(
    () => productsData.find((el) => el._id === id),
    [id, productsData]
  );
  useEffect(() => {
    console.log("вход");
    const { category, subCategory, sub2Category, ...rest } = product;
    dispatch(
      setProductForm({
        ...rest,
        category:
          categories.find((el) => el.name === product.category)?._id || "",
        subCategory:
          subCategories.find((el) => el.name === product.subCategory)?._id ||
          "",
        sub2Category:
          sub2categories.find((el) => el.name === product.sub2Category)?._id ||
          "",
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader isVisible={isLoading} />
      ) : (
        <>
          <BackBtn path="/products" />
          <UpdateProductForm />
        </>
      )}
    </div>
  );
}
