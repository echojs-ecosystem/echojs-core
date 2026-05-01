/** Inserts `node` into `parent` before `before` (or appends when `before` is null). */
export const insertNode = (parent: Node, node: Node, before: Node | null): void => {
  parent.insertBefore(node, before);
};

/** Removes a node from the DOM (no-op if it has no parent). */
export const removeNode = (node: Node): void => {
  node.parentNode?.removeChild(node);
};

/** Removes all DOM siblings between two comment markers (exclusive). */
export const clearBetween = (start: Comment, end: Comment): void => {
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    const next = cur.nextSibling;
    removeNode(cur);
    cur = next;
  }
};

/** Collects all DOM siblings between two comment markers (exclusive). */
export const collectBetween = (start: Comment, end: Comment): Node[] => {
  const out: Node[] = [];
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    out.push(cur);
    cur = cur.nextSibling;
  }
  return out;
};
