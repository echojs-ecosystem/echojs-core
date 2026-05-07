export const insertNode = (parent: Node, node: Node, before: Node | null): void => {
  parent.insertBefore(node, before);
};

