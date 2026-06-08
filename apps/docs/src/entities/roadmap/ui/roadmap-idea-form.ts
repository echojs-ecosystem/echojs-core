import { bindField } from '@echojs-ecosystem/framework/form'
import {
  button,
  type Child,
  div,
  h,
  input,
  label,
  option,
  p,
  select,
  Show,
  span,
  textarea,
} from '@echojs-ecosystem/framework/hyperdom'

import { ideaCategoryOptions } from '@entities/roadmap/constants/roadmap.data'
import type { RoadmapVM } from '@entities/roadmap/types/roadmap.types'
import { roadmapIdeaFormStyles } from '@entities/roadmap/ui/roadmap-idea-form.styles'

const form = roadmapIdeaFormStyles()

const fieldError = (errors: readonly string[]): Child =>
  errors.length ? p({ class: form.error() }, errors.join(', ')) : null

export type RoadmapIdeaFormProps = Pick<
  RoadmapVM,
  | 'ideaFields'
  | 'submitIdea'
  | 'resetIdeaForm'
  | 'submitSuccess'
  | 'lastSubmittedIdea'
  | 'githubIssueUrl'
>

export const RoadmapIdeaForm = ({
  ideaFields,
  submitIdea,
  resetIdeaForm,
  submitSuccess,
  lastSubmittedIdea,
  githubIssueUrl,
}: RoadmapIdeaFormProps): Child => {
  const { title, description, category, github } = ideaFields

  return div({ class: form.section() }, [
    div({ class: form.header() }, [
      p({ class: form.title() }, 'Suggest an idea'),
      p({ class: form.lead() }, [
        "Tell us what you'd like to see next. Ideas appear in the Planned column for this session — open a GitHub issue to make them permanent.",
      ]),
    ]),
    div({ class: form.form() }, [
      label({ class: form.field() }, [
        span({ class: form.label() }, 'Title'),
        input({
          class: form.input(),
          placeholder: 'e.g. Built-in auth templates',
          ...bindField(title, { variant: 'text', controlledValue: true }),
        }),
        (): Child => fieldError(title.meta().errors),
      ]),
      label({ class: form.field() }, [
        span({ class: form.label() }, 'Category'),
        select(
          {
            class: [form.input(), form.select()].join(' '),
            ...bindField(category, {
              variant: 'select',
              controlledValue: true,
            }),
          },
          ideaCategoryOptions.map((opt) =>
            option({ value: opt.value }, opt.label)
          )
        ),
        (): Child => fieldError(category.meta().errors),
      ]),
      label({ class: [form.field(), form.fieldFull()].join(' ') }, [
        span({ class: form.label() }, 'Description'),
        textarea({
          class: [form.input(), form.textarea()].join(' '),
          placeholder: 'What problem does this solve? Who benefits?',
          ...bindField(description, {
            variant: 'textarea',
            controlledValue: true,
          }),
        }),
        (): Child => fieldError(description.meta().errors),
      ]),
      label({ class: form.field() }, [
        span({ class: form.label() }, 'GitHub username (optional)'),
        input({
          class: form.input(),
          placeholder: '@you',
          ...bindField(github, { variant: 'text', controlledValue: true }),
        }),
        (): Child => fieldError(github.meta().errors),
      ]),
      p(
        { class: form.hint() },
        'Powered by createForm — validation runs on submit.'
      ),
      Show(submitSuccess, () => {
        const idea = lastSubmittedIdea()
        if (!idea) return null
        return p({ class: form.success() }, [
          'Thanks! Your idea was added to Planned. ',
          h(
            'a',
            {
              href: githubIssueUrl(idea),
              target: '_blank',
              rel: 'noopener noreferrer',
              class: form.successLink(),
            },
            'Open a GitHub issue'
          ),
          ' to track it with the team.',
        ])
      }),
      div({ class: form.actions() }, [
        button(
          {
            type: 'button',
            class: form.submitBtn(),
            onClick: () => void submitIdea(),
          },
          'Submit idea'
        ),
        button(
          {
            type: 'button',
            class: form.resetBtn(),
            onClick: resetIdeaForm,
          },
          'Reset'
        ),
      ]),
    ]),
  ])
}
