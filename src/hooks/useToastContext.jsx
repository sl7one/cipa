import gsap from "gsap";
import { useRef, useState } from "react";

export const useToastContext = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("default");

  const timer = useRef(null);

  const toastHide = () => {
    gsap.to("#toast", { bottom: "-100%" });
    setMessage("");
  };

  const toastShow = () => {
    gsap.to("#toast", { bottom: 0 });
    timer.current = setTimeout(toastHide, 1500);
  };

  return {
    error: (message) => {
      setMessage(message);
      setType("error");
      toastShow();
    },
    success: (message) => {
      setMessage(message);
      setType("success");
      toastShow();
    },
    message,
    type,
  };
};
