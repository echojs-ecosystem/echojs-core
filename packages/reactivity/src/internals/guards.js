const kSignalBrand = Symbol.for("echojs-ecosystem.reactivity.signal");
const kReadonlyBrand = Symbol.for("echojs-ecosystem.reactivity.readonlySignal");
export const brandWritable = (obj) => {
    Object.defineProperty(obj, kSignalBrand, { value: true });
    return obj;
};
export const brandReadonly = (obj) => {
    Object.defineProperty(obj, kSignalBrand, { value: true });
    Object.defineProperty(obj, kReadonlyBrand, { value: true });
    return obj;
};
export const isBrandedSignal = (value) => {
    return typeof value === "object" && value !== null && value[kSignalBrand] === true;
};
export const isBrandedReadonlySignal = (value) => {
    return (typeof value === "object" &&
        value !== null &&
        value[kSignalBrand] === true &&
        value[kReadonlyBrand] === true);
};
//# sourceMappingURL=guards.js.map