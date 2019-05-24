import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import NavApp from "./components/navApp";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
