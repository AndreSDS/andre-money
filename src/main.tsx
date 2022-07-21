import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createMockServer } from "./services/server";

// inicia o server mock com miragejs

createMockServer();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
