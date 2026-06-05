import { createComponent } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";

/** @deprecated Use `createComponent(model, view)()` from `@echojs-ecosystem/hyperdom`. */
export const bindModelView = <VM>(
  makeModel: () => VM,
  view: (vm: VM) => Child,
): Child => createComponent(makeModel, view)();

/** @deprecated Use `createComponent(createModel(props), view)()` from `@echojs-ecosystem/hyperdom`. */
export const bindModelViewWith = <Props, VM>(
  props: Props,
  createModel: (props: Props) => () => VM,
  view: (vm: VM) => Child,
): Child => createComponent(createModel(props), view)();
