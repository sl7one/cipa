import React, { useContext } from "react";
import { Toast } from "../context/toast-context";

export default function TestComponent() {
  const toast = useContext(Toast);
  return (
    <div>
      <h1>TEST COMPONENT </h1>

      <button
        onClick={() => {
          toast.success("Success");
        }}
      >
        BUTTON
      </button>
    </div>
  );
}
