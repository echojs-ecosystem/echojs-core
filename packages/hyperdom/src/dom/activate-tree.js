import { activateBindings } from "./activate-bindings";
export const activateTree = (root) => {
    activateBindings(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL);
    let cur = walker.nextNode();
    while (cur) {
        activateBindings(cur);
        cur = walker.nextNode();
    }
};
//# sourceMappingURL=activate-tree.js.map