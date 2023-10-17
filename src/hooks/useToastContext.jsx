import gsap from "gsap";
import { useRef, useState } from "react";
import ToastSuccess from "../components/ToastSuccess/ToastSuccess";
import ToastError from "../components/ToastError/ToastError";

export const useToastContext = () => {
  const [markup, setMarkup] = useState(<div>Toast</div>);

  const timer = useRef(null);

  const toastHide = () => {
    gsap.to("#toast", { bottom: "-100%" });
  };

  const toastShow = () => {
    gsap.to("#toast", { bottom: 0 });
  };

  const toastShowWithTimer = () => {
    gsap.to("#toast", { bottom: 0 });
    timer.current = setTimeout(toastHide, 2000);
  };

  return {
    error: (message) => {
      setMarkup(<ToastError message={message} closeToast={toastHide} />);
      toastShow();
    },
    success: (message) => {
      setMarkup(<ToastSuccess message={message} />);
      toastShowWithTimer();
    },
    markup,
  };
};
