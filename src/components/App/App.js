import React, { useEffect } from "react";
import ToastContainer from "../ToastContainer/ToastContainer";
import { Toast } from "../../context/toast-context";
import { useToastContext } from "../../hooks/useToastContext";
import PrivatRoutes from "../PrivatRoutes/PrivatRoutes";
import PublicRoutes from "../PublicRoutes/PublicRoutes";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../store/authActions";

export default function App() {
  const isLogined = useSelector((state) => state.auth.isLogined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current({ success: () => {}, failed: () => {} }));
  }, [dispatch]);

  return (
    <Toast.Provider value={useToastContext()}>
      {isLogined ? <PrivatRoutes /> : <PublicRoutes />}
      <ToastContainer />
    </Toast.Provider>
  );
}
