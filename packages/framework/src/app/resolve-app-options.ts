import type { Child } from "@echojs-ecosystem/hyperdom";

import type { EchoAppOptions, EchoProvider, EchoRootSource } from "./types";

export const ROUTER_KEY = Symbol.for("echojs.router");

export const isEchoAppOptions = (
  input: EchoRootSource | EchoAppOptions | undefined,
): input is EchoAppOptions => {
  if (input === undefined || typeof input !== "object" || input === null) {
    return false;
  }
  return (
    "view" in input ||
    "strictContextChecks" in input ||
    "body" in input ||
    "awaitProviders" in input
  );
};

export const normalizeEchoAppOptions = (
  input?: EchoRootSource | EchoAppOptions,
): EchoAppOptions => {
  if (input === undefined) {
    return {};
  }
  if (!isEchoAppOptions(input)) {
    return { view: input };
  }
  return input;
};

export const resolveAppRoot = async (options: EchoAppOptions): Promise<Child> => {
  const view = options.view;
  if (view === undefined) {
    throw new Error("echojs: app root requires `view` in createEchoApp() or `app.use(router)`");
  }

  if (typeof view === "function") {
    return await view();
  }
  return view;
};

export const resolveProviderRoot = async (providers: EchoProvider[]): Promise<Child> => {
  const rootProvider = providers.find((p) => typeof p.resolveRoot === "function");
  if (!rootProvider?.resolveRoot) {
    throw new Error("echojs: pass `view` to createEchoApp() or register a router via `app.use(router)`");
  }
  return await rootProvider.resolveRoot();
};

/** @deprecated Use {@link resolveProviderRoot} */
export const resolvePluginRoot = resolveProviderRoot;
