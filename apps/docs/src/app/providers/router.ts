import { createRouterProvider } from "@echojs/router/hyperdom";
import { appRouter } from "@app/router/router.js";

export const appRouterExport = appRouter;

export const routerProvider = createRouterProvider(appRouter);
