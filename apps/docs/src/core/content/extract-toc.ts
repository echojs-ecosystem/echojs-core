import type { DocBlock, DocDocument } from "./types.js";

export type DocTocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

export const extractDocToc = (document: DocDocument): DocTocEntry[] =>
  document.blocks.flatMap((block): DocTocEntry[] => {
    if (block.type !== "heading" || block.level < 2 || block.level > 3) return [];
    return [{ id: block.id, text: block.text, level: block.level as 2 | 3 }];
  });
