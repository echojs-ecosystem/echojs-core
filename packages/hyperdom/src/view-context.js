let viewDepth = 0;
export const isInViewContext = () => viewDepth > 0;
export const withViewContext = (fn) => {
    viewDepth++;
    try {
        return fn();
    }
    finally {
        viewDepth--;
    }
};
//# sourceMappingURL=view-context.js.map