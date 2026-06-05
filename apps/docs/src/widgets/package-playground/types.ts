import type { ReadonlySignal } from "@echojs-ecosystem/reactivity";
import type { Child } from "@echojs-ecosystem/hyperdom";

export type PlaygroundSnapshot = Record<string, unknown>;

export type PlaygroundInstance = {
  view: () => Child;
  readonly $snapshot: ReadonlySignal<PlaygroundSnapshot>;
  dispose?: () => void;
};

export type PackagePlaygroundDef = {
  id: string;
  title: string;
  hint: string;
  available: boolean;
  unavailableReason?: string;
  create: () => PlaygroundInstance;
};
