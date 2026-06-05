import { createRoute } from "@echojs-ecosystem/router";

export const legacyUserRoute = createRoute<"legacy-user", { id: string }>("legacy-user");
export const legacyExample1Route = createRoute("legacy-example1");
export const legacyExample3Route = createRoute("legacy-example3");
export const legacyExample4Route = createRoute("legacy-example4");
export const legacyStoreRoute = createRoute("legacy-store");
export const legacyPersistRoute = createRoute("legacy-persist");
