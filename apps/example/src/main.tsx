import "./style.css";
import { mount } from "@echojs-ecosystem/core";
import { App } from "./App";

// Mount to DOM
const root = document.getElementById("app");
if (root) {
  mount(root, <App />);
}