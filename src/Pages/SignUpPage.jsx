import React, { useContext } from "react";
import "./signup-page.scss";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authActions";
import { Toast } from "../context/toast-context";

export default function SignUpPage() {
  const toast = useContext(Toast);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const onSubmit = (userData) => {
    dispatch(
      signup({
        data: userData,
        success: () => toast.success("Пользователь успешно зарегистрирован"),
        failed: (message) => toast.error(message),
      })
    );
  };
  return (
    <div className="auth-page signup">
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
