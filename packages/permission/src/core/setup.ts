import type { PermissionRule, PermissionSetupConfig } from "./types";
import type { RuleStore } from "../utils/serialize";

export const applySetupConfig = (
  rules: RuleStore,
  config: PermissionSetupConfig<Record<string, readonly string[]>>,
): void => {
  rules.clear();

  for (const [resource, actions] of Object.entries(config)) {
    const resourceRules = new Map<string, PermissionRule>();

    for (const [action, rule] of Object.entries(actions as Record<string, PermissionRule>)) {
      resourceRules.set(action, rule);
    }

    rules.set(resource, resourceRules);
  }
};
