import type { Child } from "./types";

export type ModelFactory<VM> = () => VM;
export type ViewFn<VM> = (vm: VM) => Child;

/** Glue model + view into a component function (no JSX). */
export const createComponent = <VM>(
  model: ModelFactory<VM>,
  view: ViewFn<VM>,
): (() => Child) => {
  return (): Child => {
    const vm = model();
    return view(vm);
  };
};
