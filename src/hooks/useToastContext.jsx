import gsap from "gsap";
import { useRef, useState } from "react";
import ToastSuccess from "../components/ToastSuccess/ToastSuccess";
import ToastError from "../components/ToastError/ToastError";

export const useToastContext = () => {
  const [markup, setMarkup] = useState([]);

  const timer = useRef(null);

  const toastHide = () => {
    gsap.to("#toast", { bottom: "-100%", onComplete: () => setMarkup([]) });
    // setMarkup([]);
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
      setMarkup((prev) => {
        prev.push(
          <ToastError
            key={prev.length++}
            message={message}
            closeToast={toastHide}
          />
        );
        return [...prev];
      });
      toastShow();
    },
    success: (message) => {
      setMarkup((prev) => {
        prev.push(<ToastSuccess key={prev.length++} message={message} />);
        return [...prev];
      });
      toastShowWithTimer();
    },
    markup,
  };
};
