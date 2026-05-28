import { registerGuard, clearGuards as clearGuardsRegistry, type GuardRouteOptions } from "../core/guard-registry";

export type { GuardRouteOptions } from "../core/guard-registry";
export const clearGuards = clearGuardsRegistry;
export const guardRoute = (options: GuardRouteOptions): (() => void) => registerGuard(options);
