import type { ContentId } from "./types.js";

const contentModules = import.meta.glob("../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: false,
}) as Record<string, () => Promise<string>>;

const toModuleKey = (id: ContentId): string => `../../content/${id}.md`;

export const hasContent = (id: ContentId): boolean => toModuleKey(id) in contentModules;

export const loadContentRaw = async (id: ContentId): Promise<string> => {
  const loader = contentModules[toModuleKey(id)];
  if (!loader) {
    throw new Error(`Content not found: ${id}`);
  }
  return loader();
};
