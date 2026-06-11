import { createField, createForm } from '@echojs-ecosystem/framework/form'

import { ideaCategoryOptions } from '@entities/roadmap/constants/roadmap.data'
import type {
  IdeaCategory,
  IdeaFormFields,
  IdeaFormValue,
} from '@entities/roadmap/types/roadmap.types'

const trim = (value: string): string => value.trim()

const validateIdea = (fields: IdeaFormFields): Record<string, string[]> => {
  const errors: Record<string, string[]> = {}
  const title = trim(fields.title.value())
  const description = trim(fields.description.value())
  const category = fields.category.value()
  const github = trim(fields.github.value())

  if (title.length < 3) {
    errors.title = ['Title must be at least 3 characters.']
  }
  if (description.length < 10) {
    errors.description = ['Describe your idea in at least 10 characters.']
  }
  if (!ideaCategoryOptions.some((opt) => opt.value === category)) {
    errors.category = ['Pick a category.']
  }
  if (
    github &&
    !/^@?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(
      github.replace(/^@/, '')
    )
  ) {
    errors.github = ['Enter a valid GitHub username (optional).']
  }
  return errors
}

export const roadmapIdeaForm = createForm<IdeaFormValue, IdeaFormFields>(
  {
    title: createField(''),
    description: createField(''),
    category: createField<IdeaCategory>('feature'),
    github: createField(''),
  },
  {
    name: 'RoadmapIdeaForm',
    defaultValues: {
      title: '',
      description: '',
      category: 'feature',
      github: '',
    },
    validate: validateIdea,
  }
)
