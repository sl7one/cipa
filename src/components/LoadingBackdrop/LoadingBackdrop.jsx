import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import "./loading-backdrop.scss";

export default function LoadingBackdrop() {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  const isLoadingArray = useMemo(
    () => Object.values(state).map(({ isLoading }) => isLoading),
    [state]
  );

  useEffect(() => {
    const isIsLoadingSome = isLoadingArray.some((isLoading) => isLoading);
    isIsLoadingSome ? setIsLoading(true) : setIsLoading(false);
  }, [isLoadingArray]);

  return (
    <>
      {isLoading &&
        createPortal(
          <div className="loading-backdrop">LOADING DATA...</div>,
          document.querySelector("#loading-backdrop")
        )}
    </>
  );
}
