import type { Diagnostic, Rule } from "../../rule/types";

export interface AugmentedDiagnostic extends Diagnostic {
  rule: Rule;
}
