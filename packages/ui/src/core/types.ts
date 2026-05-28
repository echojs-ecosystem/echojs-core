import type { Child, Props } from "@echojs/hyperdom";
import type { ClassValue } from "../utils/cn";

/** Base props supported by all UI components. */
export type UIComponentBaseProps = {
  /** Skip visual/theme classes while keeping semantics and behavior. */
  headless?: boolean;
  class?: ClassValue;
  className?: ClassValue;
  children?: Child;
};

export type { Child, Props };
