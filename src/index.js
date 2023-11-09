import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App/App";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
