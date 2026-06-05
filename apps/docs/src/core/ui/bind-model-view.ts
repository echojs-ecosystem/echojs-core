import { createComponent } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";

/** @deprecated Use `createComponent(model, view)()` from `@echojs/hyperdom`. */
export const bindModelView = <VM>(
  makeModel: () => VM,
  view: (vm: VM) => Child,
): Child => createComponent(makeModel, view)();

/** @deprecated Use `createComponent(createModel(props), view)()` from `@echojs/hyperdom`. */
export const bindModelViewWith = <Props, VM>(
  props: Props,
  createModel: (props: Props) => () => VM,
  view: (vm: VM) => Child,
): Child => createComponent(createModel(props), view)();
