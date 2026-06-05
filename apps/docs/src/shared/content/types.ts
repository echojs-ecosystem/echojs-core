import type { CalloutVariant } from "./callout-variants.js";

/** Block AST — extensible toward MDX component nodes later. */
export type DocBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; value: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; variant: CalloutVariant; title?: string; body: string }
  | { type: "tabs"; items: { label: string; blocks: DocBlock[] }[] }
  | { type: "package-badge"; name: string }
  | { type: "package-install"; packageName: string }
  | { type: "playground"; packageId: string }
  | { type: "package-overview"; packageId: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "hr" }
  | { type: "html"; value: string };

export type DocFrontmatter = {
  title: string;
  description?: string;
  package?: string;
  keywords?: string[];
};

export type DocDocument = {
  frontmatter: DocFrontmatter;
  blocks: DocBlock[];
};

export type ContentId = string;

export type DocsNavItem = {
  slug: string;
  title: string;
  contentId: ContentId;
  routeName: string;
  keywords?: string[];
  package?: string;
  /** Small label in sidebar (e.g. "Reference", "Preview"). */
  badge?: string;
};

export type DocsNavSection = {
  id: string;
  title: string;
  slug: string;
  items: DocsNavItem[];
};

export type DocsNavItemEnriched = DocsNavItem & {
  sectionSlug: string;
  sectionTitle: string;
};
