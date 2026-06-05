import type { ContentId, DocsNavItem, DocsNavSection } from "./types.js";

const agentItem = (
  slug: string,
  title: string,
  contentId: ContentId,
  extra?: Partial<Pick<DocsNavItem, "keywords" | "badge">>,
): DocsNavItem => ({
  slug,
  title,
  contentId,
  routeName: `docs-${contentId.replace(/\//g, "-")}`,
  ...extra,
});

export const agentsNavSection: DocsNavSection = {
  id: "agents",
  title: "For agents",
  slug: "agents",
  items: [],
};

export const agentsNavItems: DocsNavItem[] = [
  agentItem("llms-txt", "LLMs.txt", "agents/llms-txt", {
    keywords: ["llms", "cursor", "copilot", "ai", "rules"],
  }),
  agentItem("agents", "AGENTS.md", "agents/agents", {
    badge: "Reference",
    keywords: ["agents", "contributing", "conventions", "architecture"],
  }),
  agentItem("model-and-view", "Model & View", "agents/model-and-view", {
    keywords: ["createModel", "createView", "hyperdom", "vm"],
  }),
  agentItem("project-layout", "Project layout", "agents/project-layout", {
    keywords: ["folders", "structure", "feature", "widget"],
  }),
];
