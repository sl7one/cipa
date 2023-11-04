import React, { Suspense } from "react";
import "./lazy-load.scss";

export default function LazyLoad({ component: Component }) {
  return (
    <Suspense fallback={<div className="lazy-load">Загрузка страницы...</div>}>
      <Component />
    </Suspense>
  );
}
