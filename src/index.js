import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// React 16 uses ReactDOM.render instead of createRoot
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
