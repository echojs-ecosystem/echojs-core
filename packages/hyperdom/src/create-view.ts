import type { Child } from "./types";
import { withViewContext } from "./view-context";

export const createView = <VM = void>(viewFn: (vm: VM) => Child): ((vm: VM) => Child) => {
  return (vm: VM): Child => withViewContext(() => viewFn(vm));
};

