import type { ContentId } from "./types.js";
import type { NavIconId } from "@widgets/icons/nav-icon-id.js";

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
  "comparisons/index": "scale",
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
};

const packagePageIcon: Record<string, NavIconId> = {
  overview: "book",
  installation: "download",
  usage: "terminal",
  api: "api",
  forms: "form",
};

export const resolveNavIcon = (contentId: ContentId, slug?: string): NavIconId => {
  const explicit = byContentId[contentId];
  if (explicit) return explicit;

  if (contentId.startsWith("packages/")) {
    const rest = contentId.slice("packages/".length);
    const [pkg, page] = rest.split("/");
    if (page && packagePageIcon[page]) return packagePageIcon[page]!;
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
