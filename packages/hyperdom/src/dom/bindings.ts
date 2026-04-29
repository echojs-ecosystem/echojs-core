type Binding = () => void;

const bindings = new WeakMap<Node, Binding[]>();

export function addBinding(node: Node, fn: Binding): void {
  const list = bindings.get(node);
  if (list) list.push(fn);
  else bindings.set(node, [fn]);
}

export function activateBindings(node: Node): void {
  const list = bindings.get(node);
  if (!list) return;
  bindings.delete(node);
  for (const fn of list) fn();
}

export function activateTree(root: Node): void {
  // root itself may have bindings
  activateBindings(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL);
  let cur: Node | null = walker.nextNode();
  while (cur) {
    activateBindings(cur);
    cur = walker.nextNode();
  }
}

