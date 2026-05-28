import { removeNode } from "./remove-node";
export const clearBetween = (start, end) => {
    let cur = start.nextSibling;
    while (cur && cur !== end) {
        const next = cur.nextSibling;
        removeNode(cur);
        cur = next;
    }
};
//# sourceMappingURL=clear-between.js.map