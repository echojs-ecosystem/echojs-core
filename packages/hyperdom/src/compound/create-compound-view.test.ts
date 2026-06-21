import { describe, expect, it } from 'vitest'
import { signal } from '@echojs-ecosystem/reactivity'

import { createView } from '../view/create-view'
import { div, header, main, span, table, tbody, td, thead, tr } from '../dsl/dsl'
import { render } from '../render/render'
import { createCompoundView } from './create-compound-view'
import { isSlotMarker } from './slot-marker'

describe('createCompoundView()', () => {
  const Layout = createCompoundView({
    name: 'Layout',
    slots: {
      Header: (props) => header({ class: 'layout-header' }, props.children),
      Main: (props) => main({ class: 'layout-main' }, props.children),
    },
    layout: ({ Header, Main }) => div({ class: 'layout' }, [Header(), Main()]),
  })

  it('exposes namespaced slots on the root', () => {
    expect(Layout.Header.displayName).toBe('Layout.Header')
    expect(Layout.Main.displayName).toBe('Layout.Main')
    expect(Layout.displayName).toBe('Layout')
  })

  it('slot calls return slot markers (not DOM)', () => {
    const marker = Layout.Header(null, 'Title')
    expect(isSlotMarker(marker)).toBe(true)
  })

  it('renders collected slots in the root layout', () => {
    const container = document.createElement('div')

    render(
      Layout(null, [Layout.Header(null, 'Dashboard'), Layout.Main(null, 'Content')]),
      container,
    )

    const root = container.firstElementChild as HTMLElement
    expect(root.className).toBe('layout')
    expect(root.querySelector('header')?.textContent).toBe('Dashboard')
    expect(root.querySelector('main')?.textContent).toBe('Content')
  })

  it('resolves nested slots inside a slot', () => {
    const Table = createCompoundView({
      name: 'Table',
      slots: {
        Head: (props) => thead(null, props.children),
        Body: (props) => tbody(null, props.children),
        Row: (props) => tr(null, props.children),
        Cell: (props) => td(null, props.children),
      },
      layout: ({ Head, Body }) => table({ class: 'data-table' }, [Head(), Body()]),
    })

    const container = document.createElement('div')

    render(
      Table(null, [
        Table.Head(null, [
          Table.Row(null, [Table.Cell(null, 'Name'), Table.Cell(null, 'Age')]),
        ]),
        Table.Body(null, [
          Table.Row(null, [Table.Cell(null, 'Ada'), Table.Cell(null, '36')]),
        ]),
      ]),
      container,
    )

    const root = container.querySelector('table')!
    expect(root.className).toBe('data-table')
    expect(root.querySelector('thead td')?.textContent).toBe('Name')
    expect(root.querySelector('tbody td')?.textContent).toBe('Ada')
  })

  it('supports reactive slot children', async () => {
    const container = document.createElement('div')
    const title = signal('Draft')

    render(
      Layout(null, () => [Layout.Header(null, () => title.value()), Layout.Main(null, 'Body')]),
      container,
    )

    expect(container.querySelector('header')?.textContent).toBe('Draft')

    title.set('Published')
    await Promise.resolve()
    expect(container.querySelector('header')?.textContent).toBe('Published')
  })

  it('returns null for missing optional slots', () => {
    const container = document.createElement('div')

    render(Layout(null, [Layout.Main(null, 'Only main')]), container)

    expect(container.querySelector('header')).toBeNull()
    expect(container.querySelector('main')?.textContent).toBe('Only main')
  })

  it('works inside createView', () => {
    const Page = createView(
      () =>
        Layout(null, [
          Layout.Header(null, span(null, 'Echo')),
          Layout.Main(null, 'Docs'),
        ]),
      'CompoundPage',
    )

    const container = document.createElement('div')
    render(Page(), container)

    expect(container.textContent).toBe('EchoDocs')
  })

  it('renders multiple instances of the same slot in order', () => {
    const Stack = createCompoundView({
      name: 'Stack',
      slots: {
        Item: (props) => div({ class: 'stack-item' }, props.children),
      },
      layout: ({ Item }) => div({ class: 'stack' }, Item()),
    })

    const container = document.createElement('div')
    render(
      Stack(null, [Stack.Item(null, 'a'), Stack.Item(null, 'b')]),
      container,
    )

    const items = container.querySelectorAll('.stack-item')
    expect(items.length).toBe(2)
    expect(items[0]?.textContent).toBe('a')
    expect(items[1]?.textContent).toBe('b')
  })
})
