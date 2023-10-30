import React, { useContext } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import "./login-page.scss";
import { Toast } from "../context/toast-context";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authActions";

export default function LoginPage() {
  const toast = useContext(Toast);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (userData) => {
    dispatch(
      login({
        data: userData,
        success: () => toast.success("Пользователь успешно зарегистрирован"),
        error: (message) => toast.error(message),
      })
    );
  };
  return (
    <div className="auth-page login">
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
