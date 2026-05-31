import { activateBindings } from "./activate-bindings";

export const activateTree = (root: Node): void => {
  activateBindings(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL);
  let cur: Node | null = walker.nextNode();
  while (cur) {
    activateBindings(cur);
    cur = walker.nextNode();
  }
};

