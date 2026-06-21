import type { Child, Component } from '../core/types'

/** @internal */
export const slotMarkerToken = Symbol('hyperdom.compound.slot')

export type SlotMarker = {
  readonly [slotMarkerToken]: true
  readonly name: string
  readonly props: Record<string, unknown>
  readonly render: Component
}

export const isSlotMarker = (value: unknown): value is SlotMarker =>
  typeof value === 'object' &&
  value !== null &&
  (value as SlotMarker)[slotMarkerToken] === true

export const createSlotMarker = (
  name: string,
  props: Record<string, unknown>,
  render: Component,
): SlotMarker => ({
  [slotMarkerToken]: true,
  name,
  props,
  render,
})

const flattenChildren = (children: Child | undefined): Child[] => {
  if (children == null || children === false || children === true) return []

  if (typeof children === 'function') return flattenChildren(children())

  if (Array.isArray(children)) {
    const out: Child[] = []
    for (const child of children) out.push(...flattenChildren(child))
    return out
  }

  return [children]
}

/** Groups slot markers found in `children` by part name (declaration order preserved). */
export const collectSlotMarkers = (children: Child | undefined): Map<string, SlotMarker[]> => {
  const grouped = new Map<string, SlotMarker[]>()

  for (const child of flattenChildren(children)) {
    if (!isSlotMarker(child)) continue

    const bucket = grouped.get(child.name)
    if (bucket) bucket.push(child)
    else grouped.set(child.name, [child])
  }

  return grouped
}
