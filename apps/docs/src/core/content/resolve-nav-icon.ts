import type { ContentId } from "./types.js";
import type { NavIconId } from "./nav-icon-id.js";

const overviewNavIcon: NavIconId = "app-window";

const isOverviewNavItem = (contentId: ContentId, slug?: string): boolean => {
  if (slug === "overview" || slug === "api-overview" || slug === "examples-overview") return true;
  if (contentId.endsWith("/overview")) return true;
  if (contentId === "comparisons/index") return true;
  return /^packages\/[^/]+$/.test(contentId);
};

const byContentId: Record<ContentId, NavIconId> = {
  "introduction/what-is-echojs": "book",
  "introduction/why-echojs": "lightbulb",
  "introduction/philosophy": "compass",
  "introduction/why-not-jsx": "code",
  "getting-started/installation": "download",
  "getting-started/first-application": "rocket",
  "getting-started/project-structure": "folder-tree",
  "architecture/overview": "layers",
  "architecture/feature-first": "puzzle",
  "architecture/providers": "plug",
  "architecture/models": "box",
  "architecture/dependency-flow": "git-branch",
  "comparisons/index": "git-branch",
  "comparisons/react": "fw-react",
  "comparisons/vue": "fw-vue",
  "comparisons/angular": "fw-angular",
  "comparisons/solid": "fw-solid",
  "comparisons/svelte": "fw-svelte",
  "guides/routing": "route",
  "guides/data-fetching": "refresh",
  "state/overview": "database",
  "state/router-state": "route",
  "state/form-state": "form",
  "state/server-state": "refresh",
  "state/url-state": "link",
  "state/client-store": "save",
  "state/local-ui-state": "zap",
  "guides/forms": "form",
  "guides/conventions": "scale",
  "guides/authentication": "shield",
  "guides/internationalization": "globe",
  "guides/callouts": "megaphone",
  "examples/todo-app": "list",
  "examples/dashboard": "layout-grid",
  "examples/admin-panel": "shield",
  "examples/e-commerce": "store",
  "api/index": "api",
  "agents/llms-txt": "file-text",
  "agents/agents": "bot",
  "agents/model-and-view": "layers",
  "agents/project-layout": "folder",
};

const packageGroupIcon: Record<string, NavIconId> = {
  reactivity: "zap",
  hyperdom: "code",
  framework: "box",
  router: "route",
  store: "database",
  query: "refresh",
  "url-state": "link",
  persist: "save",
  ui: "palette",
  i18n: "globe",
  devtools: "wrench",
  cli: "terminal",
  architect: "layers",
};

const packagePageIcon: Record<string, NavIconId> = {
  overview: overviewNavIcon,
  installation: "download",
  usage: "terminal",
  api: "api",
  forms: "form",
  "important-defaults": "zap",
  signals: "zap",
  computed: "terminal",
  effects: "refresh",
  batching: "layers",
  "scopes-and-cleanup": "folder-tree",
  "readonly-signals": "shield",
  "immutable-updates": "save",
  "hyperdom-integration": "code",
  "examples-overview": overviewNavIcon,
  counter: "zap",
  "derived-greeting": "terminal",
  "batch-updates": "layers",
  "todo-list": "list",
  "scope-timer": "refresh",
  "shopping-cart": "store",
  signal: "zap",
  effect: "refresh",
  batch: "layers",
  scope: "folder-tree",
  cleanup: "folder-tree",
  readonly: "shield",
  "type-guards": "api",
  types: "api",
  "api-overview": overviewNavIcon,
};

export const resolveNavIcon = (contentId: ContentId, slug?: string): NavIconId => {
  if (isOverviewNavItem(contentId, slug)) return overviewNavIcon;

  const explicit = byContentId[contentId];
  if (explicit) return explicit;

  if (contentId.startsWith("packages/")) {
    const rest = contentId.slice("packages/".length);
    const segments = rest.split("/");
    const last = segments[segments.length - 1];
    if (last && packagePageIcon[last]) return packagePageIcon[last]!;
    const page = segments[1];
    if (page && packagePageIcon[page]) return packagePageIcon[page]!;
    const pkg = segments[0];
    if (pkg && packageGroupIcon[pkg]) return packageGroupIcon[pkg]!;
    return "package";
  }

  if (slug && packagePageIcon[slug]) return packagePageIcon[slug]!;

  return "file-text";
};

export const resolvePackageGroupIcon = (groupId: string): NavIconId =>
  packageGroupIcon[groupId] ?? "package";

/** Brand tint for comparison framework links in the sidebar. */
const comparisonNavIconClass: Partial<Record<ContentId, string>> = {
  "comparisons/react":
    "text-[#61dafb] group-[.font-medium]:text-[#61dafb] dark:text-[#61dafb]",
  "comparisons/vue":
    "text-[#42b883] group-[.font-medium]:text-[#42b883] dark:text-[#42b883]",
  "comparisons/angular":
    "text-[#dd0031] group-[.font-medium]:text-[#dd0031] dark:text-[#f5476a]",
  "comparisons/solid":
    "text-[#2c4f7c] group-[.font-medium]:text-[#4a7ab8] dark:text-[#6b9bd1]",
  "comparisons/svelte":
    "text-[#ff3e00] group-[.font-medium]:text-[#ff3e00] dark:text-[#ff6b3d]",
};

export const resolveNavIconClass = (contentId: ContentId): string | undefined =>
  comparisonNavIconClass[contentId];
