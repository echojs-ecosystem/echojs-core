const bindings = new WeakMap();
export const addBinding = (node, fn) => {
    const list = bindings.get(node);
    if (list)
        list.push(fn);
    else
        bindings.set(node, [fn]);
};
export const takeBindings = (node) => {
    const list = bindings.get(node);
    if (!list)
        return null;
    bindings.delete(node);
    return list;
};
//# sourceMappingURL=add-binding.js.map