import { createRouteView } from "@echojs/router";
import { button, div, h4, p, pre, span, strong } from "@echojs/hyperdom";
import { findSprint } from "@entities/workspace/demo-data.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { code } from "@pages/workspace/ui/common.js";

type SprintTab = "overview" | "board" | "retro";

const tabBtn = (active: boolean): Record<string, string> => ({
  padding: "6px 12px",
  border: "1px solid var(--gray-300)",
  "border-radius": "6px",
  background: active ? "var(--primary)" : "white",
  color: active ? "white" : "var(--gray-900)",
  cursor: "pointer",
});

const tabCopy: Record<SprintTab, string> = {
  overview: "Сводка спринта и цели.",
  board: "Канбан-доска (демо-контент).",
  retro: "Ретроспектива — заметки команды.",
};

export const workspaceSprintPage = createRouteView<
  { orgId: string; teamId: string; sprintId: string },
  { tab?: SprintTab }
>({
  name: "workspace-sprint",
  view: ({ params, query }) => {
    const tab = query.tab ?? "overview";
    const found = findSprint(params.orgId, params.teamId, params.sprintId);
    const setTab = (next: SprintTab): void => {
      workspaceSprintPage.go(
        { orgId: params.orgId, teamId: params.teamId, sprintId: params.sprintId },
        { query: { tab: next }, replace: true },
      );
    };

    return div({ class: "router-page" }, [
      Breadcrumbs([
        { label: "Workspace" },
        { label: found?.org.name ?? params.orgId },
        { label: found?.team.name ?? params.teamId },
        { label: found?.sprint.name ?? params.sprintId },
      ]),
      h4(null, () => found?.sprint.name ?? `Sprint ${params.sprintId}`),
      p({ class: "router-muted" }, [
        "Три уровня ",
        code(":param"),
        " + query ",
        code("tab"),
        ":",
      ]),
      div({ class: "router-param-row" }, [
        ParamPill("orgId", params.orgId),
        ParamPill("teamId", params.teamId),
        ParamPill("sprintId", params.sprintId),
        span({ class: "router-param-pill" }, ["tab = ", strong(null, tab)]),
      ]),
      div({ class: "router-tabs", style: { display: "flex", gap: "8px", margin: "12px 0" } }, [
        button(
          { style: tabBtn(tab === "overview"), onClick: () => setTab("overview") },
          "Overview",
        ),
        button({ style: tabBtn(tab === "board"), onClick: () => setTab("board") }, "Board"),
        button({ style: tabBtn(tab === "retro"), onClick: () => setTab("retro") }, "Retro"),
      ]),
      p(null, tabCopy[tab]),
      pre({ class: "router-playground-code" }, () => JSON.stringify({ params, query: { tab } }, null, 2)),
    ]);
  },
});

