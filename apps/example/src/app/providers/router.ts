import { createRouterProvider } from "@echojs-ecosystem/router";

import { appRouter } from "../router/index.js";

export const routerProvider = createRouterProvider(appRouter);

export { appRouter };
