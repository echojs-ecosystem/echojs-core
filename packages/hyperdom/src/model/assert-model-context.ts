import { cleanup } from "@echojs-ecosystem/reactivity";

import { isInModelLifecycleContext } from "./create-model";

import type { ModelLifecycleCleanup } from "../lifecycle/effect";

export const assertModelContext = (name: string): void => {
  if (!isInModelLifecycleContext()) {
    throw new Error(
      `hyperdom: ${name}() must be called inside createModel(...) while mounted via createComponent(model, view)().`,
    );
  }
};

export const registerCleanup = (fn: ModelLifecycleCleanup): void => {
  if (typeof fn === "function") {
    cleanup(fn);
  }
};
