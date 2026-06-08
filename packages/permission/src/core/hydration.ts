import { applyBooleanRules, extractBooleanRules, type RuleStore } from "../utils/serialize";
import type { PermissionSnapshot } from "./types";

export type HydrationState = {
  rules: RuleStore;
  version: number;
  ready: boolean;
};

export const dehydratePermission = (state: HydrationState): PermissionSnapshot => {
  return {
    version: state.version,
    ready: state.ready,
    rules: extractBooleanRules(state.rules),
  };
};

export const hydratePermission = (
  rules: RuleStore,
  snapshot: PermissionSnapshot,
): HydrationState => {
  rules.clear();
  applyBooleanRules(rules, snapshot.rules);

  return {
    rules,
    version: snapshot.version,
    ready: snapshot.ready,
  };
};
