import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LazyLoad from "../LazyLoad/LazyLoad";

const signUpPage = lazy(() => import("../../Pages/SignUpPage"));
const loginPage = lazy(() => import("../../Pages/LoginPage"));

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<LazyLoad component={signUpPage} />} />
      <Route path="/login" element={<LazyLoad component={loginPage} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
