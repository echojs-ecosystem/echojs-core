import { beforeEach } from "vitest";

import { setStrictContextChecks } from "./core/config";

beforeEach(() => {
  setStrictContextChecks(false);
});
