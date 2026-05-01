import "./style.css";
import { render, setStrictContextChecks } from "@echojs/hyperdom";
import { AppView } from "./app-hyperdom";

// Mount to DOM
const root = document.getElementById("app");
if (root) {
  setStrictContextChecks(true);
  render(AppView(), root);
}
