import {
  button,
  div,
  input,
  label,
  p,
  span,
  textarea,
} from '@echojs-ecosystem/framework/hyperdom'
import { activeElement } from '@echojs-ecosystem/utils/active-element'

import type { UtilDemoDef } from '../types'
import { ud } from '../util-demo-ui'

const activeId = (el: Element | null): string => {
  if (!el || !(el instanceof HTMLElement)) return 'null'
  return el.dataset.id ?? el.tagName.toLowerCase()
}

export const activeElementDemo: UtilDemoDef = {
  slug: 'active-element',
  title: 'activeElement',
  create: () => {
    const active = activeElement()

    return {
      dispose: () => active.dispose(),
      view: () =>
        div({ class: ud.panel() }, [
          div({ class: ud.header() }, [
            p({ class: ud.title() }, 'Contact form'),
            p({ class: ud.hint() }, [
              'Focus any field, textarea, or button to see which element is active: ',
              span({ class: ud.code() }, () => activeId(active.$value.value())),
            ]),
          ]),
          div({ class: ud.form() }, [
            div({ class: ud.row2() }, [
              label({ class: ud.field() }, [
                span(null, 'Name'),
                input({
                  class: ud.input(),
                  type: 'text',
                  'data-id': 'name',
                  placeholder: 'John',
                }),
              ]),
              label({ class: ud.field() }, [
                span(null, 'Email'),
                input({
                  class: ud.input(),
                  type: 'email',
                  'data-id': 'email',
                  placeholder: 'john@example.com',
                }),
              ]),
            ]),
            label({ class: ud.field() }, [
              span(null, 'Message'),
              textarea({
                class: ud.textarea(),
                'data-id': 'message',
                placeholder: 'Type your message...',
                rows: 4,
              }),
            ]),
            div({ class: ud.actions() }, [
              button({ class: ud.btnOutline(), type: 'button', 'data-id': 'cancel' }, 'Cancel'),
              button({ class: ud.btnPrimary(), type: 'button', 'data-id': 'submit' }, 'Submit'),
            ]),
          ]),
        ]),
    }
  },
}
