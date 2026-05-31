type Binding = () => void;

const bindings = new WeakMap<Node, Binding[]>();

export const addBinding = (node: Node, fn: Binding): void => {
  const list = bindings.get(node);
  if (list) list.push(fn);
  else bindings.set(node, [fn]);
};

export const takeBindings = (node: Node): Binding[] | null => {
  const list = bindings.get(node);
  if (!list) return null;
  bindings.delete(node);
  return list;
};

