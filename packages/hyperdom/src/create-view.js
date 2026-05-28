import { withViewContext } from "./view-context";
export const createView = (viewFn, name) => {
    const view = (vm) => withViewContext(() => viewFn(vm));
    return Object.assign(view, { displayName: name });
};
//# sourceMappingURL=create-view.js.map