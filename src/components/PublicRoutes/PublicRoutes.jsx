import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";
import SignUpPage from "../../Pages/SignUpPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
