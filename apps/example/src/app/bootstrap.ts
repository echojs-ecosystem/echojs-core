import { createEchoApp } from "@echojs/framework/app";

import {
  i18nProvider,
  queryProvider,
  routerProvider,
  uiProvider,
} from "./providers/index.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
    body: { class: "echojs-lab" },
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(routerProvider)
    .mount("#app");
