import { createRouterProvider } from "@echojs/router/hyperdom";
import { appRouter } from "@entities/__routes__/router.js";

export const appRouterExport = appRouter;

export const routerProvider = createRouterProvider(appRouter);
