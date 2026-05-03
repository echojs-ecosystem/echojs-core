export const isObjectLike = (value) => {
    return typeof value === "object" && value !== null;
};
export const isPlainObject = (value) => {
    if (!isObjectLike(value))
        return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
};
export const isFunction = (value) => {
    return typeof value === "function";
};
//# sourceMappingURL=utils.js.map