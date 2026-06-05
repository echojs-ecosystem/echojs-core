import { createLayoutView } from "@echojs-ecosystem/router";
import { div, h4, li, p, ul, type Child } from "@echojs-ecosystem/hyperdom";
import { findOrg, WORKSPACE_ORGS } from "@entities/workspace/demo-data.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import { Breadcrumbs, ParamPill } from "@pages/workspace/ui/breadcrumbs.js";
import { code, NavLink } from "@pages/workspace/ui/common.js";

const workspaceLinks = (): Child[] => {
  const items: Child[] = [];
  for (const org of WORKSPACE_ORGS) {
    for (const team of org.teams) {
      const sprint = team.sprints[0];
      if (!sprint) continue;
      items.push(
        li(null, [
          NavLink({
            to: workspaceSprintPage,
            params: { orgId: org.id, teamId: team.id, sprintId: sprint.id },
            query: { tab: "board" },
            activeClass: "router-nav-active",
            class: "router-user-link",
            children: `${org.name} → ${team.name} → ${sprint.name}`,
          }),
        ]),
      );
    }
  }
  return items;
};

export const workspaceOrgLayoutPage = createLayoutView({
  name: "workspace-org-layout",
  view: ({ params, outlet }) => {
    const { orgId } = params as { orgId: string };
    const org = findOrg(orgId);

    return div({ class: "router-page router-page--layout router-nested-layout" }, [
      Breadcrumbs([
        { label: "Workspace" },
        { label: org?.name ?? orgId },
      ]),
      h4(null, () => `Организация: ${org?.name ?? orgId}`),
      p({ class: "router-muted" }, [
        "Уровень 1 — ",
        ParamPill("orgId", orgId),
        ". Шаблон: ",
        code(null, "/workspace/:orgId/team/:teamId/sprint/:sprintId"),
      ]),
      ul({ class: "router-nested-links" }, workspaceLinks()),
      div({ class: "router-outlet router-outlet--nested" }, outlet() as Child),
    ]);
  },
});

