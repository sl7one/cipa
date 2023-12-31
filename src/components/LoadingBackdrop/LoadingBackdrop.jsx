import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import "./loading-backdrop.scss";

export default function LoadingBackdrop() {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const state = useSelector((state) => state);
  const isLoadingArray = useMemo(
    () => Object.values(state).map(({ isLoading }) => isLoading),
    [state]
  );

  useEffect(() => {
    const isIsLoadingSome = isLoadingArray.some((isLoading) => isLoading);
    if (isIsLoadingSome) {
      setIsLoading(true);
      setIntervalId(
        setInterval(() => {
          setSeconds((prev) => (prev += 1));
        }, 1000)
      );
    } else {
      setIsLoading(false);
      clearInterval(intervalId);
      setSeconds(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingArray]);

  return (
    <>
      {isLoading &&
        createPortal(
          <div className="loading-backdrop">LOADING DATA... {seconds}</div>,
          document.querySelector("#loading-backdrop")
        )}
    </>
  );
}
