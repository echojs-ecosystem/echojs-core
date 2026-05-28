/** Glue model + view into a component function (no JSX). */
export const createComponent = (model, view) => {
    return () => {
        const vm = model();
        return view(vm);
    };
};
//# sourceMappingURL=component.js.map