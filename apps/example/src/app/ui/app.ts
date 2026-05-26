import { createView, type Child } from "@echojs/hyperdom";
import { appRouter } from "@app/router/index.js";

export const AppView = createView((): Child => appRouter.View, "AppView");
