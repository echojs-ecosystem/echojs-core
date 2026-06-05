import type { ContentId, DocsNavItem } from "./types.js";

export type PackageNavGroup = {
  id: string;
  title: string;
  npmPackage: string;
  children: DocsNavItem[];
};

const pkgItem = (
  packageId: string,
  slug: string,
  title: string,
  contentId: ContentId,
  npmPackage: string,
): DocsNavItem => ({
  slug,
  title,
  contentId,
  routeName: `docs-${contentId.replace(/\//g, "-")}`,
  package: npmPackage,
});

const packageDocPages = (id: string, title: string, npmPackage: string): DocsNavItem[] => [
  pkgItem(id, "overview", "Overview", `packages/${id}`, npmPackage),
  pkgItem(id, "installation", "Installation", `packages/${id}/installation`, npmPackage),
  pkgItem(id, "usage", "Usage", `packages/${id}/usage`, npmPackage),
  pkgItem(id, "example", "Example", `packages/${id}/example`, npmPackage),
  pkgItem(id, "playground", "Playground", `packages/${id}/playground`, npmPackage),
  pkgItem(id, "api", "API", `packages/${id}/api`, npmPackage),
];

export const packageNavGroups: PackageNavGroup[] = [
  { id: "reactivity", title: "Reactivity", npmPackage: "@echojs-ecosystem/reactivity", children: packageDocPages("reactivity", "Reactivity", "@echojs-ecosystem/reactivity") },
  { id: "hyperdom", title: "HyperDOM", npmPackage: "@echojs-ecosystem/hyperdom", children: packageDocPages("hyperdom", "HyperDOM", "@echojs-ecosystem/hyperdom") },
  { id: "framework", title: "Framework", npmPackage: "@echojs-ecosystem/framework", children: packageDocPages("framework", "Framework", "@echojs-ecosystem/framework") },
  { id: "router", title: "Router", npmPackage: "@echojs-ecosystem/router", children: packageDocPages("router", "Router", "@echojs-ecosystem/router") },
  { id: "store", title: "Store", npmPackage: "@echojs-ecosystem/store", children: packageDocPages("store", "Store", "@echojs-ecosystem/store") },
  { id: "query", title: "Query", npmPackage: "@echojs-ecosystem/query", children: packageDocPages("query", "Query", "@echojs-ecosystem/query") },
  { id: "url-state", title: "URL State", npmPackage: "@echojs-ecosystem/url-state", children: packageDocPages("url-state", "URL State", "@echojs-ecosystem/url-state") },
  { id: "persist", title: "Persist", npmPackage: "@echojs-ecosystem/persist", children: packageDocPages("persist", "Persist", "@echojs-ecosystem/persist") },
  {
    id: "ui",
    title: "UI",
    npmPackage: "@echojs-ecosystem/ui",
    children: [
      ...packageDocPages("ui", "UI", "@echojs-ecosystem/ui"),
      pkgItem("ui", "forms", "Forms", "guides/forms", "@echojs-ecosystem/ui"),
    ],
  },
  { id: "i18n", title: "i18n", npmPackage: "@echojs-ecosystem/i18n", children: packageDocPages("i18n", "i18n", "@echojs-ecosystem/i18n") },
  { id: "devtools", title: "DevTools", npmPackage: "@echojs-ecosystem/devtools", children: packageDocPages("devtools", "DevTools", "@echojs-ecosystem/devtools") },
  { id: "cli", title: "CLI", npmPackage: "@echojs-ecosystem/cli", children: packageDocPages("cli", "CLI", "@echojs-ecosystem/cli") },
  {
    id: "architect",
    title: "Architect",
    npmPackage: "@echojs-ecosystem/architect",
    children: packageDocPages("architect", "Architect", "@echojs-ecosystem/architect"),
  },
];

export const allPackageNavItems = packageNavGroups.flatMap((g) => g.children);

export const packageIdFromContentId = (contentId: ContentId): string | null => {
  if (!contentId.startsWith("packages/")) return null;
  const rest = contentId.slice("packages/".length);
  return rest.split("/")[0] ?? null;
};

export const packageIdFromPathname = (pathname: string): string | null => {
  const m = pathname.match(/\/docs\/packages\/([^/]+)/);
  return m?.[1] ?? null;
};
