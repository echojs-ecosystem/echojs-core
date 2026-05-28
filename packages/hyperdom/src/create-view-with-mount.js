import { mount } from "./lifecycle/on-mount";
import { createView } from "./create-view";
export const createViewWithMount = (onMount, name, viewFn) => {
    return createView((vm) => [mount(() => onMount(vm)), viewFn(vm)], name);
};
//# sourceMappingURL=create-view-with-mount.js.map