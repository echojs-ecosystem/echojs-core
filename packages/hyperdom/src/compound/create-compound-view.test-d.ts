import { describe, expectTypeOf, it } from 'vitest'

import type { Child } from '../core/types'
import { createCompoundView } from './create-compound-view'

describe('createCompoundView types', () => {
  it('attaches typed slots to the root component', () => {
    const Layout = createCompoundView({
      name: 'Layout',
      slots: {
        Header: (props: { title?: string; children?: Child }) => props.children ?? null,
        Main: (props: { children?: Child }) => props.children ?? null,
      },
      layout: ({ Header, Main }) => [Header(), Main()],
    })

    expectTypeOf(Layout.displayName).toEqualTypeOf<string>()
    expectTypeOf(Layout.Header.displayName).toEqualTypeOf<string>()
    expectTypeOf(Layout.Header.slotName).toEqualTypeOf<string>()

    Layout(null, [Layout.Header(null, 'Title'), Layout.Main(null, 'Body')])
    Layout.Header(null, 'only-header')
    Layout.Main(null, 'content')
  })

  it('types slot helpers in layout', () => {
    createCompoundView({
      name: 'Table',
      slots: {
        Head: (props: { children?: Child }) => props.children ?? null,
        Row: (props: { children?: Child }) => props.children ?? null,
      },
      layout: (slots) => {
        expectTypeOf(slots.Head).toEqualTypeOf<() => Child>()
        expectTypeOf(slots.Row).toEqualTypeOf<() => Child>()
        return slots.Head()
      },
    })
  })

  it('infers root props from slot renderers', () => {
    const Page = createCompoundView({
      name: 'Page',
      slots: {
        Main: (props: { vm: { id: string }; children?: Child }) => props.children ?? null,
      },
      layout: ({ Main }, { vm }) => {
        expectTypeOf(vm).toEqualTypeOf<{ id: string }>()
        return Main()
      },
    })

    Page({ vm: { id: '1' } }, [Page.Main({ vm: { id: '1' } })])
  })
})
