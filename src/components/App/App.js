import React, { useState } from "react";
import ToastContainer from "../ToastContainer/ToastContainer";
import { Toast } from "../../context/toast-context";
import { useToastContext } from "../../hooks/useToastContext";
import PrivatRoutes from "../PrivatRoutes/PrivatRoutes";
import PublicRoutes from "../PublicRoutes/PublicRoutes";

export default function App() {
  const [isLogined, setIsLogined] = useState(false);
  return (
    <Toast.Provider value={useToastContext()}>
      {isLogined ? <PrivatRoutes /> : <PublicRoutes />}
      <ToastContainer />
    </Toast.Provider>
  );
}
