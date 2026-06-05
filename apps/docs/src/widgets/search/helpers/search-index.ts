import { allDocsNavItems } from "@shared/content/nav.js";
import type { ContentId } from "@shared/content/types.js";

export type SearchEntry = {
  id: string;
  title: string;
  description?: string;
  href: string;
  section: string;
  kind: "page" | "package" | "api";
  keywords: string[];
};

const homeEntry: SearchEntry = {
  id: "home",
  title: "EchoJS Documentation",
  description: "Signal-first framework for scalable web applications",
  href: "/",
  section: "Home",
  kind: "page",
  keywords: ["echojs", "home", "documentation"],
};

export const searchIndex: SearchEntry[] = [
  homeEntry,
  ...allDocsNavItems.map((item) => ({
    id: item.contentId,
    title: item.title,
    description: item.package ? `Package ${item.package}` : undefined,
    href: `/docs/${item.sectionSlug}/${item.slug}`,
    section: item.sectionTitle,
    kind: (item.sectionSlug === "packages"
      ? "package"
      : item.sectionSlug === "api"
        ? "api"
        : "page") as SearchEntry["kind"],
    keywords: [
      item.title,
      item.slug,
      item.contentId,
      item.sectionSlug,
      ...(item.keywords ?? []),
      ...(item.package ? [item.package] : []),
    ],
  })),
];

export const searchDocs = (query: string, limit = 12): SearchEntry[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .map((entry) => {
      const haystack = [entry.title, entry.description ?? "", entry.section, ...entry.keywords]
        .join(" ")
        .toLowerCase();
      const score =
        (haystack.includes(q) ? 10 : 0) +
        (entry.title.toLowerCase().startsWith(q) ? 8 : 0) +
        entry.keywords.filter((k) => k.toLowerCase().includes(q)).length * 2;
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
};

export type { ContentId };
