import { modernPackageDocConfigs, type ModernPackageDocConfig } from "./package-doc-config.js";
import type { ContentId, DocsNavItem } from "./types.js";

export type PackageNavSubsection = {
  kind: "subsection";
  id: string;
  title: string;
  children: DocsNavItem[];
};

export type PackageNavChild = DocsNavItem | PackageNavSubsection;

export type PackageNavGroup = {
  id: string;
  title: string;
  npmPackage: string;
  /** Sidebar highlight — recommended entry point for new apps. */
  featured?: boolean;
  /** Standalone subpath; documented on each package Installation page. */
  frameworkSubpath?: string;
  children: PackageNavChild[];
};

export const frameworkImportPath = (subpath: string): string =>
  `@echojs-ecosystem/framework/${subpath}`;

export const isPackageNavSubsection = (child: PackageNavChild): child is PackageNavSubsection =>
  "kind" in child && child.kind === "subsection";

export const flattenPackageNavChildren = (children: PackageNavChild[]): DocsNavItem[] =>
  children.flatMap((child) => (isPackageNavSubsection(child) ? child.children : [child]));

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

const subsection = (id: string, title: string, children: DocsNavItem[]): PackageNavSubsection => ({
  kind: "subsection",
  id,
  title,
  children,
});

const guidePages = (cfg: ModernPackageDocConfig): DocsNavItem[] =>
  cfg.guides.map(({ slug, title }) =>
    pkgItem(cfg.id, slug, title, `packages/${cfg.id}/guides/${slug}`, cfg.npmPackage),
  );

const apiPages = (cfg: ModernPackageDocConfig): DocsNavItem[] =>
  cfg.api.map(({ slug, title }) => {
    const contentId =
      slug === "overview" ? (`packages/${cfg.id}/api` as ContentId) : (`packages/${cfg.id}/api/${slug}` as ContentId);
    const navSlug = slug === "overview" ? "api-overview" : slug;
    return pkgItem(cfg.id, navSlug, title, contentId, cfg.npmPackage);
  });

const examplePages = (cfg: ModernPackageDocConfig): DocsNavItem[] =>
  cfg.examples.map(({ slug, title }) => {
    const contentId =
      slug === "overview"
        ? (`packages/${cfg.id}/example` as ContentId)
        : (`packages/${cfg.id}/examples/${slug}` as ContentId);
    const navSlug = slug === "overview" ? "examples-overview" : slug;
    return pkgItem(cfg.id, navSlug, title, contentId, cfg.npmPackage);
  });

const modernPackageDocPages = (cfg: ModernPackageDocConfig): PackageNavChild[] => [
  pkgItem(cfg.id, "overview", "Overview", `packages/${cfg.id}`, cfg.npmPackage),
  pkgItem(cfg.id, "installation", "Installation", `packages/${cfg.id}/installation`, cfg.npmPackage),
  ...(cfg.guides.length > 0 ? [subsection("guides", "Guides & Concepts", guidePages(cfg))] : []),
  ...(cfg.api.length > 0 ? [subsection("api", "API Reference", apiPages(cfg))] : []),
  ...(cfg.examples.length > 0 ? [subsection("examples", "Examples", examplePages(cfg))] : []),
  pkgItem(cfg.id, "playground", "Playground", `packages/${cfg.id}/playground`, cfg.npmPackage),
];

const sortFeaturedFirst = (groups: PackageNavGroup[]): PackageNavGroup[] => {
  const featured = groups.filter((g) => g.featured);
  const rest = groups.filter((g) => !g.featured);
  return [...featured, ...rest];
};

export const packageNavGroups: PackageNavGroup[] = sortFeaturedFirst(
  modernPackageDocConfigs.map((cfg) => ({
    id: cfg.id,
    title: cfg.title,
    npmPackage: cfg.npmPackage,
    featured: cfg.featured,
    frameworkSubpath: cfg.frameworkSubpath,
    children: modernPackageDocPages(cfg),
  })),
);

/** UI package also links to global Forms guide. */
const uiGroup = packageNavGroups.find((g) => g.id === "ui");
if (uiGroup) {
  uiGroup.children.push(
    pkgItem("ui", "forms", "Forms", "guides/forms", "@echojs-ecosystem/ui"),
  );
}

export const allPackageNavItems = packageNavGroups.flatMap((g) => flattenPackageNavChildren(g.children));

export const packageIdFromContentId = (contentId: ContentId): string | null => {
  if (!contentId.startsWith("packages/")) return null;
  const rest = contentId.slice("packages/".length);
  return rest.split("/")[0] ?? null;
};

export const packageIdFromPathname = (pathname: string): string | null => {
  const m = pathname.match(/\/docs\/packages\/([^/]+)/);
  return m?.[1] ?? null;
};

export { modernPackageDocConfigs } from "./package-doc-config.js";
