import type { DocTocEntry } from "@shared/content/extract-toc.js";

export type DocTocProps = {
  entries: DocTocEntry[];
};

export type DocTocVM = {
  props: DocTocProps;
  navigateToEntry: (id: string) => void;
  linkClass: (level: DocTocEntry["level"]) => string;
};
