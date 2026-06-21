import type { Child } from "../../core/types";
import { displayRegion } from "../display-region";

type IfBranch = {
  when: () => boolean;
  render: () => Child;
};

const resolveActiveIndex = (cases: readonly IfBranch[]): number => {
  for (let i = 0; i < cases.length; i++) {
    if (cases[i]!.when()) return i;
  }
  return -1;
};

/**
 * If / else-if / else — first branch starts the chain (`v-if`).
 *
 * @example
 * ```ts
 * If(() => status.value() === "idle", () => IdleView())
 *   .IfElse(() => status.value() === "loading", () => Spinner())
 *   .Else(() => ErrorView())
 * ```
 */
export function If(condition: () => boolean, render: () => Child): IfBuilder {
  return new IfBuilder(condition, render);
}

export class IfBuilder {
  private readonly cases: IfBranch[] = [];

  constructor(condition?: () => boolean, render?: () => Child) {
    if (condition && render) {
      this.cases.push({ when: condition, render });
    }
  }

  /** Next branches (`v-else-if`). */
  IfElse(condition: () => boolean, render: () => Child): this {
    this.cases.push({ when: condition, render });
    return this;
  }

  /** Fallback when no branch matched — no condition. */
  Else(render: () => Child): () => Child {
    return this.toChild(render);
  }

  /** Build without fallback — nothing visible when no branch matches. */
  End(): () => Child {
    return this.toChild(undefined);
  }

  private toChild(fallback?: () => Child): () => Child {
    const cases = this.cases;

    return () => {
      const regions: Child[] = cases.map((branch, index) =>
        displayRegion(() => resolveActiveIndex(cases) === index, branch.render),
      );

      if (fallback) {
        regions.push(
          displayRegion(() => resolveActiveIndex(cases) === -1, fallback),
        );
      }

      if (regions.length === 0) return null;
      if (regions.length === 1) return regions[0]!;
      return regions;
    };
  }
}
