import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/global.css";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
