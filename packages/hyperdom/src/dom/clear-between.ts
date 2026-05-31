import { removeNode } from "./remove-node";

export const clearBetween = (start: Comment, end: Comment): void => {
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    const next = cur.nextSibling;
    removeNode(cur);
    cur = next;
  }
};

