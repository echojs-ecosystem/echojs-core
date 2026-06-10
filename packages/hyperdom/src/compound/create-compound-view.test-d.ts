import { describe, expectTypeOf, it } from 'vitest'

import type { Child } from '../types'
import { createCompoundView } from './create-compound-view'

describe('createCompoundView types', () => {
  it('attaches typed parts to the root component', () => {
    const Layout = createCompoundView({
      name: 'Layout',
      parts: {
        Header: (props: { title?: string; children?: Child }) => props.children ?? null,
        Main: (props: { children?: Child }) => props.children ?? null,
      },
      render: ({ Header, Main }) => [Header(), Main()],
    })

    expectTypeOf(Layout.displayName).toEqualTypeOf<string>()
    expectTypeOf(Layout.Header.displayName).toEqualTypeOf<string>()
    expectTypeOf(Layout.Header.slotName).toEqualTypeOf<string>()

    Layout(null, [Layout.Header(null, 'Title'), Layout.Main(null, 'Body')])
    Layout.Header(null, 'only-header')
    Layout.Main(null, 'content')
  })

  it('types slot helpers in render', () => {
    createCompoundView({
      name: 'Table',
      parts: {
        Head: (props: { children?: Child }) => props.children ?? null,
        Row: (props: { children?: Child }) => props.children ?? null,
      },
      render: (slots) => {
        expectTypeOf(slots.Head).toEqualTypeOf<() => Child>()
        expectTypeOf(slots.Row).toEqualTypeOf<() => Child>()
        return slots.Head()
      },
    })
  })
})
