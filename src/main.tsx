import React from "react";
import ReactDOM from "react-dom/client";
import "./samples/node-api";
import "./index.css";
import TimeFlow from "./components/TimeFlow/timeflow";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <TimeFlow />
    </Router>
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
