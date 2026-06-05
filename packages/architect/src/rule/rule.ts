import type { Rule, RuleName, RuleOptions } from "./types";

type RuleFn = {
  (name: RuleName): Rule;
  (options: RuleOptions): Rule;
};

export const rule: RuleFn = (config) => {
  const defaultCheck = () => ({ diagnostics: [] });

  if (typeof config === "string") {
    return {
      name: config,
      severity: "error",
      descriptionUrl: undefined,
      check: defaultCheck,
    };
  }

  return {
    name: config.name,
    severity: config.severity ?? "error",
    descriptionUrl: config.descriptionUrl,
    check: config.check ?? defaultCheck,
  };
};
