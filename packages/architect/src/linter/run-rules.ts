import type { AbstractionInstance } from "../abstraction/instance/types";
import type { Rule, RuleContext } from "../rule/types";
import type { AugmentedDiagnostic } from "./reporter";

export const runRules = async ({
  root,
  instance,
  dependenciesMap,
}: RuleContext) => {
  const ruleDiagnostics =
    (currentInstance: AbstractionInstance) => async (rule: Rule) => {
      if (rule.severity === "off") {
        return [];
      }
      const { diagnostics } = await rule.check({
        root,
        instance: currentInstance,
        dependenciesMap,
      });
      return diagnostics.map((d) => ({ ...d, rule }));
    };

  const runAbstractionRules = (
    currentInstance: AbstractionInstance,
  ): Promise<AugmentedDiagnostic[]>[] => {
    return currentInstance.abstraction.rules
      .map(ruleDiagnostics(currentInstance))
      .concat(...currentInstance.children.flatMap(runAbstractionRules));
  };

  return await Promise.all(runAbstractionRules(instance)).then((r) => r.flat());
};
