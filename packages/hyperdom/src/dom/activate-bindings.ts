import { takeBindings } from "./add-binding";

export const activateBindings = (node: Node): void => {
  const list = takeBindings(node);
  if (!list) return;
  for (const fn of list) fn();
};

