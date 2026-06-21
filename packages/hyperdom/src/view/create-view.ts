import type { Child } from "../core/types";
import { withViewContext } from "../core/view-context";

export const createView = <VM = void>(
  viewFn: (vm: VM) => Child,
  name: string,
): ((vm: VM) => Child) => {
  const view = (vm: VM): Child => withViewContext(() => viewFn(vm));
  return Object.assign(view, { displayName: name });
};
