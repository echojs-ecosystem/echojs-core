import { createRouterProvider } from "@echojs/router/hyperdom";

import { appRouter } from "../router/index.js";

export const routerProvider = createRouterProvider(appRouter);

export { appRouter };
