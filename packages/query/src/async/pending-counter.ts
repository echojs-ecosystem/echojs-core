import type { Signal } from '@echojs/reactivity'

export const incrementPending = ($pendingCount: Signal<number>): void => {
  $pendingCount.set($pendingCount.peek() + 1)
}

export const decrementPending = ($pendingCount: Signal<number>): void => {
  const next = Math.max(0, $pendingCount.peek() - 1)
  $pendingCount.set(next)
}

export const resetPending = ($pendingCount: Signal<number>): void => {
  $pendingCount.set(0)
}
