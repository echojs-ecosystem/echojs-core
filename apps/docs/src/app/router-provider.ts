import { createRouterProvider } from "@echojs-ecosystem/framework/router";
import { appRouter } from "@app/router/router.js";

export const routerProvider = createRouterProvider(appRouter);
