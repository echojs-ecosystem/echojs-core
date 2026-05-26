export type WorkspaceSprint = { readonly id: string; readonly name: string };

export type WorkspaceTeam = {
  readonly id: string;
  readonly name: string;
  readonly sprints: readonly WorkspaceSprint[];
};

export type WorkspaceOrg = {
  readonly id: string;
  readonly name: string;
  readonly teams: readonly WorkspaceTeam[];
};

export const WORKSPACE_ORGS: readonly WorkspaceOrg[] = [
  {
    id: "acme",
    name: "Acme Labs",
    teams: [
      {
        id: "platform",
        name: "Platform",
        sprints: [
          { id: "s24", name: "Sprint 24 — Router" },
          { id: "s25", name: "Sprint 25 — Forms" },
        ],
      },
      {
        id: "growth",
        name: "Growth",
        sprints: [{ id: "g11", name: "Growth 11" }],
      },
    ],
  },
  {
    id: "north",
    name: "Northwind",
    teams: [
      {
        id: "ops",
        name: "Operations",
        sprints: [{ id: "ops-3", name: "Ops cycle 3" }],
      },
    ],
  },
] as const;

export const findOrg = (orgId: string): WorkspaceOrg | undefined =>
  WORKSPACE_ORGS.find((o) => o.id === orgId);

export const findTeam = (
  orgId: string,
  teamId: string,
): { org: WorkspaceOrg; team: WorkspaceTeam } | undefined => {
  const org = findOrg(orgId);
  const team = org?.teams.find((t) => t.id === teamId);
  return org && team ? { org, team } : undefined;
};

export const findSprint = (
  orgId: string,
  teamId: string,
  sprintId: string,
): { org: WorkspaceOrg; team: WorkspaceTeam; sprint: WorkspaceSprint } | undefined => {
  const found = findTeam(orgId, teamId);
  const sprint = found?.team.sprints.find((s) => s.id === sprintId);
  return found && sprint ? { ...found, sprint } : undefined;
};
