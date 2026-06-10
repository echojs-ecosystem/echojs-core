import type { Child, Component } from '../types'
import { withViewContext } from '../view-context'
import {
  collectSlotMarkers,
  createSlotMarker,
  isSlotMarker,
  type SlotMarker,
} from './slot-marker'

/** Part renderers passed to {@link createCompoundView}. */
export type CompoundPartDefs = Record<string, Component<any>>

type PartPropsFromRender<R> = R extends Component<infer P>
  ? P & { children?: Child }
  : { children?: Child }

/**
 * Callable shape shared by compound roots and parts — same ergonomics as DSL tags:
 * `Part()`, `Part(props)`, `Part('text')`, `Part(props, children, …)`.
 */
export type CompoundCallFn<Props extends { children?: Child } = { children?: Child }> = {
  (): Child
  (props?: Props | null): Child
  (props: Props | null, children?: Child, ...rest: Child[]): Child
  (children?: Child, ...rest: Child[]): Child
}

export type CompoundPartFn<Props extends { children?: Child } = { children?: Child }> =
  CompoundCallFn<Props> & {
    readonly displayName: string
    readonly slotName: string
  }

export type CompoundRootFn<RootProps extends { children?: Child } = { children?: Child }> =
  CompoundCallFn<RootProps> & {
    readonly displayName: string
  }

export type MappedCompoundParts<Parts extends CompoundPartDefs> = {
  [K in keyof Parts]: CompoundPartFn<PartPropsFromRender<Parts[K]>>
}

export type SlotRenderers<Parts extends CompoundPartDefs> = {
  readonly [K in keyof Parts]: () => Child
}

export type CompoundViewConfig<
  Parts extends CompoundPartDefs,
  RootProps extends { children?: Child } = { children?: Child },
> = {
  /** Debug label — e.g. `"Layout"` → `Layout.Header.displayName`. */
  name: string
  /** Named sub-views attached as `Root.Part` (e.g. `Layout.Header`). */
  parts: Parts
  /** Compose collected slots into the root tree. */
  render: (slots: SlotRenderers<Parts>, props: RootProps) => Child
}

export type CompoundView<
  Parts extends CompoundPartDefs,
  RootProps extends { children?: Child } = { children?: Child },
> = CompoundRootFn<RootProps> & MappedCompoundParts<Parts>

const resolveSlotChildren = (
  children: Child | undefined,
  parts: CompoundPartDefs,
): Child | undefined => {
  if (children == null || children === false || children === true) return children ?? undefined

  if (typeof children === 'function') {
    return () => resolveSlotChildren(children(), parts)
  }

  if (Array.isArray(children)) {
    const resolved = children.flatMap((child) => {
      const next = resolveOne(child, parts)
      if (next == null || next === false || next === true) return []
      return Array.isArray(next) ? next : [next]
    })
    if (resolved.length === 0) return undefined
    if (resolved.length === 1) return resolved[0]
    return resolved
  }

  return resolveOne(children, parts)
}

const resolveOne = (child: Child, parts: CompoundPartDefs): Child => {
  if (child == null || child === false || child === true) return child

  if (isSlotMarker(child)) return renderSlotMarker(child, parts)

  if (typeof child === 'function') {
    return () => resolveSlotChildren(child(), parts) as Child
  }

  if (Array.isArray(child)) {
    return resolveSlotChildren(child, parts) ?? []
  }

  return child
}

const renderSlotMarker = (marker: SlotMarker, parts: CompoundPartDefs): Child =>
  withViewContext(() =>
    marker.render({
      ...marker.props,
      children: resolveSlotChildren(marker.props.children as Child | undefined, parts),
    }),
  )

const renderCollected = (markers: SlotMarker[], parts: CompoundPartDefs): Child => {
  if (markers.length === 0) return null
  if (markers.length === 1) return renderSlotMarker(markers[0]!, parts)

  return markers.map((marker) => renderSlotMarker(marker, parts))
}

const createSlotHelpers = <Parts extends CompoundPartDefs>(
  collected: Map<string, SlotMarker[]>,
  parts: Parts,
): SlotRenderers<Parts> =>
  Object.fromEntries(
    Object.keys(parts).map((name) => [
      name,
      () => renderCollected(collected.get(name) ?? [], parts),
    ]),
  ) as SlotRenderers<Parts>

const createSlotPart = <P>(
  compoundName: string,
  partName: string,
  render: Component<P>,
): CompoundPartFn<P & { children?: Child }> => {
  const part = ((arg1?: unknown, arg2?: unknown, ...rest: unknown[]): Child => {
    const propsBag = isPropsBag(arg1)
      ? ({ ...(arg1 ?? {}) } as P & { children?: Child })
      : ({} as P & { children?: Child })
    const childrenList = isPropsBag(arg1) ? [arg2, ...rest] : [arg1, arg2, ...rest]
    const children = normalizeCallChildren(childrenList)

    const props = {
      ...propsBag,
      children: children ?? propsBag.children,
    } as P & { children?: Child }

    return createSlotMarker(partName, props, render as Component) as unknown as Child
  }) as CompoundPartFn<P & { children?: Child }>

  return Object.assign(part, {
    displayName: `${compoundName}.${partName}`,
    slotName: partName,
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
  Parts extends CompoundPartDefs,
  RootProps extends { children?: Child },
>(
  config: CompoundViewConfig<Parts, RootProps>,
  props: RootProps,
): Child => {
  const collected = collectSlotMarkers(props.children)
  const slots = createSlotHelpers(collected, config.parts)
  return withViewContext(() => config.render(slots, props))
}

const renderCompoundRoot = <
  Parts extends CompoundPartDefs,
  RootProps extends { children?: Child },
>(
  config: CompoundViewConfig<Parts, RootProps>,
  props: RootProps,
): Child => {
  if (typeof props.children === 'function') {
    const children = props.children
    return () => buildCompoundTree(config, { ...props, children: children() })
  }

  return buildCompoundTree(config, props)
}

/**
 * Compound view factory — namespaced sub-parts (`Layout.Header`, `Table.Row`, …).
 *
 * Sub-parts return slot markers when called; the root collects them and renders
 * the layout. Nested parts inside a slot are resolved automatically.
 *
 * @example
 * ```ts
 * const Layout = createCompoundView({
 *   name: 'Layout',
 *   parts: {
 *     Header: (props) => header(null, props.children),
 *     Main: (props) => main(null, props.children),
 *   },
 *   render: ({ Header, Main }) => div({ class: 'layout' }, [Header(), Main()]),
 * })
 *
 * Layout(null, [Layout.Header(null, 'Title'), Layout.Main(null, content)])
 * ```
 */
export const createCompoundView = <
  Parts extends CompoundPartDefs,
  RootProps extends { children?: Child } = { children?: Child },
>(
  config: CompoundViewConfig<Parts, RootProps>,
): CompoundView<Parts, RootProps> => {
  const parts = {} as MappedCompoundParts<Parts>

  for (const [partName, render] of Object.entries(config.parts)) {
    parts[partName as keyof Parts] = createSlotPart(
      config.name,
      partName,
      render,
    ) as MappedCompoundParts<Parts>[keyof Parts]
  }

  const root = ((arg1?: unknown, arg2?: unknown, ...rest: unknown[]): Child => {
    const propsBag = isPropsBag(arg1) ? ({ ...(arg1 ?? {}) } as RootProps) : ({} as RootProps)
    const childrenList = isPropsBag(arg1) ? [arg2, ...rest] : [arg1, arg2, ...rest]
    const children = normalizeCallChildren(childrenList)

    const props = {
      ...propsBag,
      children: children ?? propsBag.children,
    } as RootProps

    return renderCompoundRoot(config, props)
  }) as CompoundView<Parts, RootProps>

  return Object.assign(root, parts, { displayName: config.name })
}

/** Alias for {@link createCompoundView}. */
export const createSlotView = createCompoundView
