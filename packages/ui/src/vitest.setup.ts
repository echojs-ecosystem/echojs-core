import { beforeEach } from "vitest";
import { setStrictContextChecks } from "@echojs-ecosystem/hyperdom";

import { resetIdCounter } from "./core/ids";
import { resetUIContextStack } from "./theme/theme-context";

beforeEach(() => {
  setStrictContextChecks(false);
  resetUIContextStack();
  resetIdCounter();
});
