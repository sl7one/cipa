import React from "react";
import "./hello-user.scss";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { logout } from "../../store/authActions";

export default function HelloUser() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout({ data: user._id, success: () => {}, failed: () => {} }));
  };

  return (
    <div className="hello-user">
      <button type="button" onClick={onClickLogout}>
        <Icons name="logout" />
      </button>
      <h2>{user.firstName}</h2>
    </div>
  );
}
