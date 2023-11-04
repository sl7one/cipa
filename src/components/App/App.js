import React, { useEffect } from "react";
import ToastContainer from "../ToastContainer/ToastContainer";
import { Toast } from "../../context/toast-context";
import { useToastContext } from "../../hooks/useToastContext";
import PrivatRoutes from "../PrivatRoutes/PrivatRoutes";
import PublicRoutes from "../PublicRoutes/PublicRoutes";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../store/authActions";
import useSelectContext from "../../hooks/useSelectContext";
import { Select } from "../../context/select-context";
import LoadingBackdrop from "../LoadingBackdrop/LoadingBackdrop";

export default function App() {
  const isLogined = useSelector((state) => state.auth.isLogined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current({ success: () => {}, failed: () => {} }));
  }, [dispatch]);

  return (
    <>
      <Select.Provider value={useSelectContext()}>
        <Toast.Provider value={useToastContext()}>
          {isLogined ? <PrivatRoutes /> : <PublicRoutes />}
          <ToastContainer />
        </Toast.Provider>
      </Select.Provider>
      <LoadingBackdrop />
    </>
  );
}
