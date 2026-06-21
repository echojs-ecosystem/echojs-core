import type { Child } from '../../core/types'
import type { InvertPattern } from './infer-pattern'
import { matches } from './patterns'
import type { MatchCase, Pattern } from './types'
import { createOtherwiseCase, createWhenCase } from './when'

type SignalLike<T> = { value(): T }

const readSource = <T>(source: SignalLike<T> | (() => T)): T => {
  if (typeof source === 'function') return source()
  return source.value()
}

const resolveMatch = <T>(value: T, cases: readonly MatchCase<T>[]): Child => {
  for (const branch of cases) {
    if (branch.tag === 'when' && matches(branch.pattern, value)) {
      return branch.render(value)
    }
    if (branch.tag === 'otherwise') return branch.render()
  }
  return null
}

/**
 * Pattern-matching control flow for views.
 *
 * Value type is inferred from `source`. Each `.When()` narrows the handler argument
 * from its pattern (ts-pattern-style).
 */
export function Match<T>(source: SignalLike<T> | (() => T)): MatchBuilder<T> {
  return new MatchBuilder(source)
}

export class MatchBuilder<T> {
  private readonly cases: MatchCase<T>[] = []

  constructor(private readonly source: SignalLike<T> | (() => T)) {}

  /** First matching pattern wins — handler type is inferred from the pattern. */
  When<N extends T>(guard: (value: T) => value is N, render: (value: N) => Child): this
  When<p extends Pattern<T>>(pattern: p, render: (value: InvertPattern<p, T>) => Child): this
  When(
    pattern: Pattern<T> | ((value: T) => boolean),
    render: (value: T) => Child,
  ): this {
    this.cases.push(createWhenCase(pattern, render))
    return this
  }

  /** Fallback when no `.When()` matched — returns a reactive region. */
  Otherwise(render: () => Child): () => Child {
    this.cases.push(createOtherwiseCase(render))
    return this.toChild()
  }

  /** Build without fallback (`null` when nothing matches). */
  Render(): () => Child {
    return this.toChild()
  }

  private toChild(): () => Child {
    const source = this.source
    const cases = this.cases
    return () => resolveMatch(readSource(source), cases)
  }
}
