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
  { id: "reactivity", title: "Reactivity", npmPackage: "@echojs/reactivity", children: packageDocPages("reactivity", "Reactivity", "@echojs/reactivity") },
  { id: "hyperdom", title: "HyperDOM", npmPackage: "@echojs/hyperdom", children: packageDocPages("hyperdom", "HyperDOM", "@echojs/hyperdom") },
  { id: "framework", title: "Framework", npmPackage: "@echojs/framework", children: packageDocPages("framework", "Framework", "@echojs/framework") },
  { id: "router", title: "Router", npmPackage: "@echojs/router", children: packageDocPages("router", "Router", "@echojs/router") },
  { id: "store", title: "Store", npmPackage: "@echojs/store", children: packageDocPages("store", "Store", "@echojs/store") },
  { id: "query", title: "Query", npmPackage: "@echojs/query", children: packageDocPages("query", "Query", "@echojs/query") },
  { id: "url-state", title: "URL State", npmPackage: "@echojs/url-state", children: packageDocPages("url-state", "URL State", "@echojs/url-state") },
  { id: "persist", title: "Persist", npmPackage: "@echojs/persist", children: packageDocPages("persist", "Persist", "@echojs/persist") },
  {
    id: "ui",
    title: "UI",
    npmPackage: "@echojs/ui",
    children: [
      ...packageDocPages("ui", "UI", "@echojs/ui"),
      pkgItem("ui", "forms", "Forms", "guides/forms", "@echojs/ui"),
    ],
  },
  { id: "i18n", title: "i18n", npmPackage: "@echojs/i18n", children: packageDocPages("i18n", "i18n", "@echojs/i18n") },
  { id: "devtools", title: "DevTools", npmPackage: "@echojs/devtools", children: packageDocPages("devtools", "DevTools", "@echojs/devtools") },
  { id: "cli", title: "CLI", npmPackage: "@echojs/cli", children: packageDocPages("cli", "CLI", "@echojs/cli") },
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
