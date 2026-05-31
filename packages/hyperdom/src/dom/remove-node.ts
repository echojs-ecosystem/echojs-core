export const removeNode = (node: Node): void => {
  node.parentNode?.removeChild(node);
};

