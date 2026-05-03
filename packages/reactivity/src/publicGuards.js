import { isBrandedReadonlySignal, isBrandedSignal } from "./internals/guards";
export const isSignal = (value) => {
    return isBrandedSignal(value);
};
export const isReadonlySignal = (value) => {
    return isBrandedReadonlySignal(value);
};
//# sourceMappingURL=publicGuards.js.map