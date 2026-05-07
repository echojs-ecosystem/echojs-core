export const collectBetween = (start: Comment, end: Comment): Node[] => {
  const out: Node[] = [];
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    out.push(cur);
    cur = cur.nextSibling;
  }
  return out;
};

