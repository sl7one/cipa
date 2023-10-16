import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";
import MenuPopup from "../MenuPopup/MenuPopup";
import MenuButton from "../MenuButton/MenuButton";
import Routes from "../Routes/Routes";
import { Toast } from "../../context/toast-context";
import { getAllProducts } from "../../store/productsActions";
import { getAllOrders } from "../../store/ordersActions";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import ErrorPage from "../../Pages/ErrorPage";

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
        navigate("orders");
      } catch (error) {
        toast.error("Не удалось загрузить данные с сервера");
        navigate("error");
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
            <nav>
              <Routes />
            </nav>
            <MenuButton />
            <MenuPopup />
          </div>
          {isLoading ? <Loader isVisible={isLoading} /> : <Outlet />}
        </>
      )}
    </>
  );
}
