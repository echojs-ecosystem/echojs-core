import "@app/query/query-provider.js";
import "./style.css";
import { render, setStrictContextChecks } from "@echojs/hyperdom";
import { AppView } from "@app/ui/app.js";
import { initI18n } from "@app/i18n/index.js";

const root = document.getElementById("app");
if (root) {
  document.body.classList.add("echojs-lab");
  setStrictContextChecks(true);

  void initI18n().then(() => {
    render(AppView(), root);
  });
}
