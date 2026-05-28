export const debounce = (fn, ms) => {
    let timer;
    const debounced = ((...args) => {
        if (timer != null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = undefined;
            fn(...args);
        }, ms);
    });
    debounced.cancel = () => {
        if (timer != null) {
            clearTimeout(timer);
            timer = undefined;
        }
    };
    debounced.flush = () => {
        if (timer == null) {
            return;
        }
        clearTimeout(timer);
        timer = undefined;
        fn();
    };
    return debounced;
};
//# sourceMappingURL=debounce.js.map