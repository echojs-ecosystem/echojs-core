import "./style.css";
import { render, setStrictContextChecks } from "@echojs/hyperdom";
import { AppView } from "@app/ui/app.js";

const root = document.getElementById("app");
if (root) {
  document.body.classList.add("echojs-lab");
  setStrictContextChecks(true);
  render(AppView(), root);
}
