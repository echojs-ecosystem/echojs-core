export function insertNode(parent: Node, node: Node, before: Node | null): void {
  parent.insertBefore(node, before);
}

export function removeNode(node: Node): void {
  node.parentNode?.removeChild(node);
}

export function clearBetween(start: Comment, end: Comment): void {
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    const next = cur.nextSibling;
    removeNode(cur);
    cur = next;
  }
}

export function collectBetween(start: Comment, end: Comment): Node[] {
  const out: Node[] = [];
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    out.push(cur);
    cur = cur.nextSibling;
  }
  return out;
}

