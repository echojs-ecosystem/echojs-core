export const persist = (target, extension) => {
    const extendable = target;
    if (typeof extendable.extend === "function") {
        return extendable.extend(extension);
    }
    const result = extension(target);
    Object.assign(target, result);
    return target;
};
export const persistField = (field, extension) => {
    return persist(field, extension);
};
export const persistFieldArray = (fieldArray, extension) => {
    return persist(fieldArray, extension);
};
//# sourceMappingURL=persist-target.js.map