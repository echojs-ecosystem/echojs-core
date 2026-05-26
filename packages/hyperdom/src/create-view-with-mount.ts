import type { Child } from "./types";
import type { MountCleanup } from "./lifecycle/on-mount";
import { mount } from "./lifecycle/on-mount";
import { createView } from "./create-view";

export const createViewWithMount = <VM = void>(
  onMount: (vm: VM) => MountCleanup,
  name: string,
  viewFn: (vm: VM) => Child,
): ((vm: VM) => Child) => {
  return createView((vm: VM): Child => [mount(() => onMount(vm)), viewFn(vm)], name);
};
