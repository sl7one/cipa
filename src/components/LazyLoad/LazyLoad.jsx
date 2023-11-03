import React, { Suspense } from "react";

export default function LazyLoad({ component: Component }) {
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Component />
    </Suspense>
  );
}
