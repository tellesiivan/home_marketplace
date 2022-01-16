import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Browser } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Browser>
      <App />
    </Browser>
  </React.StrictMode>,
  document.getElementById("root")
);
