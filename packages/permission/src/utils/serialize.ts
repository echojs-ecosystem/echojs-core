import type { PermissionRule, PermissionSnapshot } from "../core/types";

export type RuleStore = Map<string, Map<string, PermissionRule>>;

export const isPromise = (value: unknown): value is Promise<unknown> => {
  return (
    value !== null &&
    typeof value === "object" &&
    "then" in value &&
    typeof (value as Promise<unknown>).then === "function"
  );
};

export const isAsyncRule = (rule: PermissionRule): boolean => {
  if (typeof rule !== "function") {
    return false;
  }

  return rule.constructor.name === "AsyncFunction";
};

export const extractBooleanRules = (rules: RuleStore): PermissionSnapshot["rules"] => {
  const serialized: PermissionSnapshot["rules"] = {};

  for (const [resource, actions] of rules) {
    const resourceRules: Record<string, boolean> = {};

    for (const [action, rule] of actions) {
      if (typeof rule === "boolean") {
        resourceRules[action] = rule;
      }
    }

    if (Object.keys(resourceRules).length > 0) {
      serialized[resource] = resourceRules;
    }
  }

  return serialized;
};

export const applyBooleanRules = (rules: RuleStore, snapshotRules: PermissionSnapshot["rules"]): void => {
  for (const [resource, actions] of Object.entries(snapshotRules)) {
    let resourceRules = rules.get(resource);

    if (!resourceRules) {
      resourceRules = new Map();
      rules.set(resource, resourceRules);
    }

    for (const [action, value] of Object.entries(actions)) {
      resourceRules.set(action, value);
    }
  }
};
