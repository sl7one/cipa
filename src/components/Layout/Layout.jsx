import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";
import { Toast } from "../../context/toast-context";
import { getAllProducts } from "../../store/productsActions";
import { getAllOrders } from "../../store/ordersActions";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import ErrorPage from "../../Pages/ErrorPage";
import { getAllClients } from "../../store/clientsActions";
import { getAllLocations } from "../../store/locationsActions";
import { getAllCategories } from "../../store/categoriesActions";
import { getAllSubCategories } from "../../store/subCategoriesActions";
import { getAllSub2Categories } from "../../store/sub2CategoriesActions";
import ModalRoutes from "../ModalRoutes/ModalRoutes";
import HelloUser from "../HelloUser/HelloUser";
import RouteNavigationButton from "../RouteNavigationButton/RouteNavigationButton";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useContext(Toast);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        await dispatch(getAllProducts());
        await dispatch(getAllOrders());
        await dispatch(getAllClients());
        await dispatch(getAllLocations());
        await dispatch(getAllCategories());
        await dispatch(getAllSubCategories());
        await dispatch(getAllSub2Categories());

        navigate("orders");
      } catch (error) {
        toast.error({
          message: "Не удалось загруить данные с сервера",
          error: "Сервер не отвечает",
          statusCode: 500,
        });
        navigate("bad-connection");
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <div className="layout">
            <HelloUser />
            <RouteNavigationButton />
          </div>
          <ModalRoutes />
          {isLoading ? <Loader isVisible={isLoading} /> : <Outlet />}
        </>
      )}
    </>
  );
}
