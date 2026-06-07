import { agentsNavItems, agentsNavSection } from "./agents-nav.js";
import { allPackageNavItems, packageNavGroups } from "./package-nav.js";
import type { ContentId, DocsNavItem, DocsNavItemEnriched, DocsNavSection } from "./types.js";

export type { DocsNavItem, DocsNavSection } from "./types.js";
export { agentsNavSection, agentsNavItems } from "./agents-nav.js";

const item = (
  slug: string,
  title: string,
  contentId: ContentId,
  extra?: Partial<Pick<DocsNavItem, "keywords" | "package">>,
): DocsNavItem => ({
  slug,
  title,
  contentId,
  routeName: `docs-${contentId.replace(/\//g, "-")}`,
  ...extra,
});

export const docsNavSections: DocsNavSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    slug: "introduction",
    items: [
      item("what-is-echojs", "What is EchoJS", "introduction/what-is-echojs"),
      item("why-echojs", "Why EchoJS", "introduction/why-echojs"),
      item("philosophy", "Philosophy", "introduction/philosophy"),
      item("why-not-jsx", "Why not JSX", "introduction/why-not-jsx", {
        keywords: ["jsx", "hyperdom", "declarative", "imperative", "h", "templates"],
      }),
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    slug: "getting-started",
    items: [
      item("installation", "Installation", "getting-started/installation"),
      item("first-application", "First Application", "getting-started/first-application"),
      item("project-structure", "Project Structure", "getting-started/project-structure"),
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    slug: "architecture",
    items: [
      item("overview", "Overview", "architecture/overview"),
      item("feature-first", "Feature First", "architecture/feature-first"),
      item("providers", "Providers", "architecture/providers"),
      item("models", "Models", "architecture/models"),
      item("dependency-flow", "Dependency Flow", "architecture/dependency-flow"),
    ],
  },
  {
    id: "guides",
    title: "Guides",
    slug: "guides",
    items: [
      item("routing", "Routing", "guides/routing"),
      item("data-fetching", "Data Fetching", "guides/data-fetching"),
      item("forms", "Forms", "guides/forms"),
      item("conventions", "Conventions", "guides/conventions", {
        keywords: ["naming", "signals", "stores", "createModel", "createView"],
      }),
      item("authentication", "Authentication", "guides/authentication"),
      item("internationalization", "Internationalization", "guides/internationalization"),
      item("callouts", "Callouts", "guides/callouts", {
        keywords: ["admonition", "warning", "danger", "tip", "note"],
      }),
    ],
  },
  {
    id: "state",
    title: "State Management",
    slug: "state",
    items: [
      item("overview", "Overview", "state/overview", {
        keywords: ["state", "signals", "store", "query", "router", "form", "url"],
      }),
      item("router-state", "Router state", "state/router-state", {
        keywords: ["params", "query", "beforeLoad", "navigation"],
      }),
      item("form-state", "Form state", "state/form-state", {
        keywords: ["createForm", "createField", "validation"],
      }),
      item("server-state", "Server state", "state/server-state", {
        keywords: ["createQuery", "cache", "mutation", "api"],
      }),
      item("url-state", "URL state", "state/url-state", {
        keywords: ["query params", "filters", "pagination"],
      }),
      item("client-store", "Client store", "state/client-store", {
        keywords: ["createStore", "theme", "session", "persist"],
      }),
      item("local-ui-state", "Local UI state", "state/local-ui-state", {
        keywords: ["signal", "computed", "model", "tabs"],
      }),
    ],
  },
  {
    id: "packages",
    title: "Packages",
    slug: "packages",
    items: [],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    slug: "comparisons",
    items: [
      item("index", "Overview", "comparisons/index", {
        keywords: ["compare", "react", "vue", "angular", "solid", "svelte"],
      }),
      item("react", "EchoJS vs React", "comparisons/react", {
        keywords: ["react", "hooks", "redux", "react query", "react router", "ecosystem"],
      }),
      item("vue", "EchoJS vs Vue", "comparisons/vue", {
        keywords: ["vue", "pinia", "vue router", "nuxt", "composition api"],
      }),
      item("angular", "EchoJS vs Angular", "comparisons/angular", {
        keywords: ["angular", "rxjs", "ngrx", "signals", "dependency injection"],
      }),
      item("solid", "EchoJS vs Solid", "comparisons/solid", {
        keywords: ["solid", "signals", "jsx", "solidstart"],
      }),
      item("svelte", "EchoJS vs Svelte", "comparisons/svelte", {
        keywords: ["svelte", "runes", "sveltekit", "compiler"],
      }),
    ],
  },
  {
    id: "examples",
    title: "Examples",
    slug: "examples",
    items: [
      item("todo-app", "Todo App", "examples/todo-app"),
      item("dashboard", "Dashboard", "examples/dashboard"),
      item("admin-panel", "Admin Panel", "examples/admin-panel"),
      item("e-commerce", "E-commerce", "examples/e-commerce"),
    ],
  },
  {
    id: "api",
    title: "API Reference",
    slug: "api",
    items: [item("index", "API Overview", "api/index", { keywords: ["api", "reference"] })],
  },
];

export { packageNavGroups } from "./package-nav.js";

const mapSectionItems = (section: DocsNavSection, items: DocsNavItem[]): DocsNavItemEnriched[] =>
  items.map((it) => ({ ...it, sectionSlug: section.slug, sectionTitle: section.title }));

const pickCanonicalNavItem = (duplicates: DocsNavItemEnriched[]): DocsNavItemEnriched => {
  if (duplicates.length === 1) return duplicates[0]!;
  const exact = duplicates.find((it) => `${it.sectionSlug}/${it.slug}` === it.contentId);
  if (exact) return exact;
  const prefixed = duplicates.find((it) => it.contentId.startsWith(`${it.sectionSlug}/`));
  return prefixed ?? duplicates[0]!;
};

export const allDocsNavItems: DocsNavItemEnriched[] = [
  ...docsNavSections.flatMap((s) => {
    if (s.id === "packages") {
      return mapSectionItems(s, allPackageNavItems);
    }
    return mapSectionItems(s, s.items);
  }),
  ...mapSectionItems(agentsNavSection, agentsNavItems),
];

/** One route per `contentId` — sidebar may link to the same doc from multiple places (e.g. Guides + UI → Forms). */
export const canonicalDocsRouteItems = (): DocsNavItemEnriched[] => {
  const byContentId = new Map<ContentId, DocsNavItemEnriched[]>();
  for (const item of allDocsNavItems) {
    const list = byContentId.get(item.contentId) ?? [];
    list.push(item);
    byContentId.set(item.contentId, list);
  }
  return [...byContentId.values()].map(pickCanonicalNavItem);
};

export const findNavItemByContentId = (contentId: ContentId): DocsNavItemEnriched | undefined => {
  const matches = allDocsNavItems.filter((it) => it.contentId === contentId);
  return matches.length ? pickCanonicalNavItem(matches) : undefined;
};

export type DocNavAdjacent = {
  prev?: DocsNavItemEnriched;
  next?: DocsNavItemEnriched;
};

/** Previous/next doc in {@link canonicalDocsRouteItems} order (matches sidebar reading order). */
export const getAdjacentDocNavItems = (contentId: ContentId): DocNavAdjacent => {
  const items = canonicalDocsRouteItems();
  const index = items.findIndex((it) => it.contentId === contentId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  };
};

export const docPath = (sectionSlug: string, pageSlug: string): string =>
  `/docs/${sectionSlug}/${pageSlug}`;
