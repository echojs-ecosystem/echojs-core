import type { Child, Component } from '../types'
import { withViewContext } from '../view-context'
import {
  collectSlotMarkers,
  createSlotMarker,
  isSlotMarker,
  type SlotMarker,
} from './slot-marker'

/** Slot renderers passed to {@link createCompoundView}. */
export type CompoundSlotDefs = Record<string, Component<any>>

/** @deprecated Use {@link CompoundSlotDefs}. */
export type CompoundPartDefs = CompoundSlotDefs

type SlotPropsFromRender<R> = R extends Component<infer P>
  ? P & { children?: Child }
  : { children?: Child }

/**
 * Callable shape shared by compound roots and slots — same ergonomics as DSL tags:
 * `Slot()`, `Slot(props)`, `Slot('text')`, `Slot(props, children, …)`.
 */
export type CompoundCallFn<Props extends { children?: Child } = { children?: Child }> = {
  (): Child
  (props?: Props | null): Child
  (props: Props | null, children?: Child, ...rest: Child[]): Child
  (children?: Child, ...rest: Child[]): Child
}

export type CompoundSlotFn<Props extends { children?: Child } = { children?: Child }> =
  CompoundCallFn<Props> & {
    readonly displayName: string
    readonly slotName: string
  }

/** @deprecated Use {@link CompoundSlotFn}. */
export type CompoundPartFn<Props extends { children?: Child } = { children?: Child }> =
  CompoundSlotFn<Props>

export type CompoundRootFn<RootProps extends { children?: Child } = { children?: Child }> =
  CompoundCallFn<RootProps> & {
    readonly displayName: string
  }

export type MappedCompoundSlots<Slots extends CompoundSlotDefs> = {
  [K in keyof Slots]: CompoundSlotFn<SlotPropsFromRender<Slots[K]>>
}

/** @deprecated Use {@link MappedCompoundSlots}. */
export type MappedCompoundParts<Parts extends CompoundSlotDefs> = MappedCompoundSlots<Parts>

export type SlotRenderers<Slots extends CompoundSlotDefs> = {
  readonly [K in keyof Slots]: () => Child
}

export type CompoundViewConfig<
  Slots extends CompoundSlotDefs,
  RootProps extends { children?: Child } = { children?: Child },
> = {
  /** Debug label — e.g. `"Layout"` → `Layout.Header.displayName`. */
  name: string
  /** Named slot renderers attached as `Root.Slot` (e.g. `Layout.Header`). */
  slots: Slots
  /** Compose collected slots into the root tree. */
  layout: (slots: SlotRenderers<Slots>, props: RootProps) => Child
}

type SlotComponentProps<R> = R extends Component<infer P> ? P : { children?: Child }

type RootPropsFromSlots<Slots extends CompoundSlotDefs> = Omit<
  SlotComponentProps<Slots[keyof Slots]>,
  'children'
> & { children?: Child }

export type CompoundView<
  Slots extends CompoundSlotDefs,
  RootProps extends { children?: Child } = { children?: Child },
> = CompoundRootFn<RootProps> & MappedCompoundSlots<Slots>

const resolveSlotChildren = (
  children: Child | undefined,
  slots: CompoundSlotDefs,
): Child | undefined => {
  if (children == null || children === false || children === true) return children ?? undefined

  if (typeof children === 'function') {
    return () => resolveSlotChildren(children(), slots)
  }

  if (Array.isArray(children)) {
    const resolved = children.flatMap((child) => {
      const next = resolveOne(child, slots)
      if (next == null || next === false || next === true) return []
      return Array.isArray(next) ? next : [next]
    })
    if (resolved.length === 0) return undefined
    if (resolved.length === 1) return resolved[0]
    return resolved
  }

  return resolveOne(children, slots)
}

const resolveOne = (child: Child, slots: CompoundSlotDefs): Child => {
  if (child == null || child === false || child === true) return child

  if (isSlotMarker(child)) return renderSlotMarker(child, slots)

  if (typeof child === 'function') {
    return () => resolveSlotChildren(child(), slots) as Child
  }

  if (Array.isArray(child)) {
    return resolveSlotChildren(child, slots) ?? []
  }

  return child
}

const renderSlotMarker = (marker: SlotMarker, slots: CompoundSlotDefs): Child =>
  withViewContext(() =>
    marker.render({
      ...marker.props,
      children: resolveSlotChildren(marker.props.children as Child | undefined, slots),
    }),
  )

const renderCollected = (markers: SlotMarker[], slots: CompoundSlotDefs): Child => {
  if (markers.length === 0) return null
  if (markers.length === 1) return renderSlotMarker(markers[0]!, slots)

  return markers.map((marker) => renderSlotMarker(marker, slots))
}

const createSlotHelpers = <Slots extends CompoundSlotDefs>(
  collected: Map<string, SlotMarker[]>,
  slots: Slots,
): SlotRenderers<Slots> =>
  Object.fromEntries(
    Object.keys(slots).map((name) => [
      name,
      () => renderCollected(collected.get(name) ?? [], slots),
    ]),
  ) as SlotRenderers<Slots>

const createCompoundSlot = <P>(
  compoundName: string,
  slotName: string,
  render: Component<P>,
): CompoundSlotFn<P & { children?: Child }> => {
  const slot = ((arg1?: unknown, arg2?: unknown, ...rest: unknown[]): Child => {
    const propsBag = isPropsBag(arg1)
      ? ({ ...(arg1 ?? {}) } as P & { children?: Child })
      : ({} as P & { children?: Child })
    const childrenList = isPropsBag(arg1) ? [arg2, ...rest] : [arg1, arg2, ...rest]
    const children = normalizeCallChildren(childrenList)

    const props = {
      ...propsBag,
      children: children ?? propsBag.children,
    } as P & { children?: Child }

    return createSlotMarker(slotName, props, render as Component) as unknown as Child
  }) as CompoundSlotFn<P & { children?: Child }>

  return Object.assign(slot, {
    displayName: `${compoundName}.${slotName}`,
    slotName,
  })
}

const isPropsBag = (value: unknown): value is Record<string, unknown> | null | undefined =>
  value === null ||
  (typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value as Node).nodeType &&
    !isSlotMarker(value))

const normalizeCallChildren = (list: unknown[]): Child | undefined => {
  const filtered = list.filter((value) => value !== undefined)
  if (filtered.length === 0) return undefined
  if (filtered.length === 1) return filtered[0] as Child
  return filtered as Child[]
}

const buildCompoundTree = <
  Slots extends CompoundSlotDefs,
  RootProps extends { children?: Child },
>(
  config: CompoundViewConfig<Slots, RootProps>,
  props: RootProps,
): Child => {
  const collected = collectSlotMarkers(props.children)
  const slotRenderers = createSlotHelpers(collected, config.slots)
  return withViewContext(() => config.layout(slotRenderers, props))
}

const renderCompoundRoot = <
  Slots extends CompoundSlotDefs,
  RootProps extends { children?: Child },
>(
  config: CompoundViewConfig<Slots, RootProps>,
  props: RootProps,
): Child => {
  if (typeof props.children === 'function') {
    const children = props.children
    return () => buildCompoundTree(config, { ...props, children: children() })
  }

  return buildCompoundTree(config, props)
}

/**
 * Compound view factory — namespaced slots (`Layout.Header`, `Table.Row`, …).
 *
 * Slots return markers when called; the root collects them and renders the layout.
 * Nested slots inside a slot tree are resolved automatically.
 *
 * @example
 * ```ts
 * const Layout = createCompoundView({
 *   name: 'Layout',
 *   slots: {
 *     Header: (props) => header(null, props.children),
 *     Main: (props) => main(null, props.children),
 *   },
 *   layout: ({ Header, Main }) => div({ class: 'layout' }, [Header(), Main()]),
 * })
 *
 * Layout(null, [Layout.Header(null, 'Title'), Layout.Main(null, content)])
 * ```
 */
export function createCompoundView<const Slots extends CompoundSlotDefs>(
  config: {
    name: string
    slots: Slots
    layout: (slots: SlotRenderers<Slots>, props: RootPropsFromSlots<Slots>) => Child
  },
): CompoundView<Slots, RootPropsFromSlots<Slots>> {
  type RootProps = RootPropsFromSlots<Slots>
  const compoundSlots = {} as MappedCompoundSlots<Slots>

  for (const [slotName, render] of Object.entries(config.slots)) {
    compoundSlots[slotName as keyof Slots] = createCompoundSlot(
      config.name,
      slotName,
      render,
    ) as MappedCompoundSlots<Slots>[keyof Slots]
  }

  const root = ((arg1?: unknown, arg2?: unknown, ...rest: unknown[]): Child => {
    const propsBag = isPropsBag(arg1) ? ({ ...(arg1 ?? {}) } as RootProps) : ({} as RootProps)
    const childrenList = isPropsBag(arg1) ? [arg2, ...rest] : [arg1, arg2, ...rest]
    const children = normalizeCallChildren(childrenList)

    const props = {
      ...propsBag,
      children: children ?? propsBag.children,
    } as RootProps

    return renderCompoundRoot(
      config as CompoundViewConfig<Slots, RootProps>,
      props,
    )
  }) as CompoundView<Slots, RootProps>

  return Object.assign(root, compoundSlots, { displayName: config.name })
}

/** Alias for {@link createCompoundView}. */
export const createSlotView = createCompoundView
