import { signal } from "@echojs/reactivity";
import { div, p } from "@echojs/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

export const createStubPlayground = (
  id: string,
  title: string,
  reason: string,
): PackagePlaygroundDef => ({
  id,
  title,
  hint: reason,
  available: false,
  unavailableReason: reason,
  create: (): PlaygroundInstance => {
    const $snapshot = signal<Record<string, unknown>>({ available: false });
    return {
      $snapshot,
      view: () => div({ class: pg.unavailable() }, [p(null, reason)]),
    };
  },
});
