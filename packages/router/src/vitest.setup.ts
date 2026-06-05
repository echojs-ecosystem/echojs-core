import { beforeEach } from "vitest";
import { setStrictContextChecks } from "@echojs-ecosystem/hyperdom";

beforeEach(() => {
  setStrictContextChecks(false);
});
