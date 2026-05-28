import { takeBindings } from "./add-binding";
export const activateBindings = (node) => {
    const list = takeBindings(node);
    if (!list)
        return;
    for (const fn of list)
        fn();
};
//# sourceMappingURL=activate-bindings.js.map