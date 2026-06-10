import type { Child } from '../../types'
import type { OtherwiseCase, Pattern, WhenCase } from './types'

/** @internal */
export function createWhenCase<T>(
  pattern: Pattern<T>,
  render: (value: T) => Child,
): WhenCase<T> {
  return {
    tag: 'when',
    pattern: pattern as Pattern<unknown>,
    render,
  }
}

/** @internal */
export const createOtherwiseCase = (render: () => Child): OtherwiseCase => ({
  tag: 'otherwise',
  render,
})
