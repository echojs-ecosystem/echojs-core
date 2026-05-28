import { createLayoutView } from "@echojs/router";
import { div, h4, li, p, ul, type Child } from "@echojs/hyperdom";
import { findTeam } from "@entities/workspace/demo-data.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { NavLink } from "@pages/workspace/ui/common.js";

export const workspaceTeamLayoutPage = createLayoutView({
  name: "workspace-team-layout",
  view: ({ params, outlet }) => {
    const { orgId, teamId } = params as { orgId: string; teamId: string };
    const found = findTeam(orgId, teamId);

    return div({ class: "router-page router-page--layout router-nested-layout router-nested-layout--level2" }, [
      Breadcrumbs([
        { label: "Workspace" },
        { label: found?.org.name ?? orgId },
        { label: found?.team.name ?? teamId },
      ]),
      h4(null, () => `Команда: ${found?.team.name ?? teamId}`),
      p({ class: "router-muted" }, [
        "Уровень 2 — ",
        ParamPill("orgId", orgId),
        " ",
        ParamPill("teamId", teamId),
      ]),
      ul(
        { class: "router-nested-links" },
        (found?.team.sprints ?? []).map((sprint) =>
          li(null, [
            NavLink({
              to: workspaceSprintPage,
              params: { orgId, teamId, sprintId: sprint.id },
              query: { tab: "overview" },
              activeClass: "router-nav-active",
              class: "router-user-link",
              children: sprint.name,
            }),
          ]),
        ) as Child[],
      ),
      div({ class: "router-outlet router-outlet--nested" }, outlet() as Child),
    ]);
  },
});

