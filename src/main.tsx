import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "antd/dist/reset.css";
import "./index.css";
import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/header.css";
import "./styles/dashboard.css";
import "./styles/forms.css";
import "./styles/login.css";
import "./styles/loader.css";
import "./styles/report.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);