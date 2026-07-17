import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { AcademicProvider } from "./context/AcademicContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AcademicProvider>
    <App />

    </AcademicProvider>
  </React.StrictMode>
);