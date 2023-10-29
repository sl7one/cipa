import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import "./signup-page.scss";

export default function SignUpPage() {
  return (
    <div className="auth-page signup">
      <LoginForm />
    </div>
  );
}
