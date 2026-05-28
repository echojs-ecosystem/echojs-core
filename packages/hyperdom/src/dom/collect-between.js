export const collectBetween = (start, end) => {
    const out = [];
    let cur = start.nextSibling;
    while (cur && cur !== end) {
        out.push(cur);
        cur = cur.nextSibling;
    }
    return out;
};
//# sourceMappingURL=collect-between.js.map