import { beforeEach } from "vitest";
import { setStrictContextChecks } from "@echojs/hyperdom";

beforeEach(() => {
  setStrictContextChecks(false);
});
