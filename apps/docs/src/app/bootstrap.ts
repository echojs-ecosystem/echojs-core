import { createEchoApp } from "@echojs-ecosystem/framework/app";
import {
  i18nProvider,
  queryProvider,
  themeProvider,
  uiProvider,
} from "@core/providers/index.js";
import { routerProvider } from "@app/router-provider.js";
import { bindDocsHeaderScroll } from "@app/docs-header-scroll.js";
import { bindMobileNavCloseOnNavigate, bindMobileScrollLock } from "@app/mobile-scroll-lock.js";

bindMobileScrollLock();
bindMobileNavCloseOnNavigate();
bindDocsHeaderScroll();

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
