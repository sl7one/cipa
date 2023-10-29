import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import "./login-page.scss";

export default function LoginPage() {
  return (
    <div className="auth-page login">
      <LoginForm />
    </div>
  );
}
