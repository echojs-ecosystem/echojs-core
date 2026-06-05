import { createEchoApp } from "@echojs/framework/app";
import {
  i18nProvider,
  queryProvider,
  routerProvider,
  themeProvider,
  uiProvider,
} from "@app/providers/index.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(themeProvider)
    .use(routerProvider)
    .mount("#app");
