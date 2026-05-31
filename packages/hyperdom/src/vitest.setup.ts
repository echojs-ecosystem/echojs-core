import { beforeEach } from "vitest";

import { setStrictContextChecks } from "./config";

beforeEach(() => {
  setStrictContextChecks(false);
});
