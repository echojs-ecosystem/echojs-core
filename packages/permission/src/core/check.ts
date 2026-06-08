import { parsePermissionKey } from "../utils/path";
import { isAsyncRule, isPromise, type RuleStore } from "../utils/serialize";
import type { PermissionRule } from "./types";

const ASYNC_RULE_ERROR =
  'Permission rule is async. Use checkAsync() instead of check() for this permission key.';

export type CheckContext = {
  rules: RuleStore;
  isReady: () => boolean;
};

const resolveRule = (
  rules: RuleStore,
  key: string,
): { rule: PermissionRule; resource: string; action: string } | null => {
  const parsed = parsePermissionKey(key);

  if (!parsed) {
    return null;
  }

  const resourceRules = rules.get(parsed.resource);
  const rule = resourceRules?.get(parsed.action);

  if (rule === undefined) {
    return null;
  }

  return {
    rule,
    resource: parsed.resource,
    action: parsed.action,
  };
};

const evaluateSyncRule = (rule: PermissionRule, payload: unknown): boolean => {
  if (typeof rule === "boolean") {
    return rule;
  }

  if (isAsyncRule(rule)) {
    throw new Error(ASYNC_RULE_ERROR);
  }

  const fn = rule as (payload?: unknown) => boolean;
  const result = fn(payload);

  if (isPromise(result)) {
    throw new Error(ASYNC_RULE_ERROR);
  }

  return result;
};

const evaluateAsyncRule = async (rule: PermissionRule, payload: unknown): Promise<boolean> => {
  if (typeof rule === "boolean") {
    return rule;
  }

  const fn = rule as (payload?: unknown) => boolean | Promise<boolean>;
  return await fn(payload);
};

export const checkPermission = (context: CheckContext, key: string, payload?: unknown): boolean => {
  if (!context.isReady()) {
    return false;
  }

  const resolved = resolveRule(context.rules, key);

  if (!resolved) {
    return false;
  }

  return evaluateSyncRule(resolved.rule, payload);
};

export const checkPermissionAsync = async (
  context: CheckContext,
  key: string,
  payload?: unknown,
): Promise<boolean> => {
  if (!context.isReady()) {
    return false;
  }

  const resolved = resolveRule(context.rules, key);

  if (!resolved) {
    return false;
  }

  return evaluateAsyncRule(resolved.rule, payload);
};
