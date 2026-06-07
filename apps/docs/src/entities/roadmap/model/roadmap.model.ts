import { createField, createForm } from '@echojs-ecosystem/framework/form'
import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import {
  ideaCategoryOptions,
  roadmapColumns,
  roadmapGithubRepo,
} from '@entities/roadmap/constants/roadmap.data.js'
import type {
  CommunityIdea,
  IdeaCategory,
  IdeaFormFields,
  IdeaFormValue,
  RoadmapVM,
} from '@entities/roadmap/types/roadmap.types.js'

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

const buildGithubIssueUrl = (idea: IdeaFormValue): string => {
  const categoryLabel =
    ideaCategoryOptions.find((opt) => opt.value === idea.category)?.label ??
    idea.category
  const title = `[Roadmap idea] ${idea.title.trim()}`
  const body = [
    '## Idea',
    idea.description.trim(),
    '',
    `**Category:** ${categoryLabel}`,
    idea.github.trim()
      ? `**GitHub:** @${idea.github.trim().replace(/^@/, '')}`
      : '',
    '',
    '_Submitted via the EchoJS docs roadmap page._',
  ]
    .filter(Boolean)
    .join('\n')

  const params = new URLSearchParams({
    title,
    body,
    labels: 'roadmap',
  })
  return `${roadmapGithubRepo}/issues/new?${params.toString()}`
}

export const createRoadmapModel = createModel((): RoadmapVM => {
  const $communityIdeas = signal<CommunityIdea[]>([])
  const $submitSuccess = signal(false)
  const $lastSubmittedIdea = signal<IdeaFormValue | null>(null)

  const ideaForm = createForm<IdeaFormValue, IdeaFormFields>(
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

  const { title, description, category, github } = ideaForm.fields

  const resetIdeaForm = (): void => {
    ideaForm.reset()
    $submitSuccess.set(false)
    $lastSubmittedIdea.set(null)
  }

  const submitIdea = async (): Promise<void> => {
    const result = await ideaForm.submit(async (value) => {
      const idea: CommunityIdea = {
        title: trim(value.title),
        description: trim(value.description),
        category: value.category,
        github: trim(value.github),
        id: crypto.randomUUID(),
        submittedAt: Date.now(),
      }
      $communityIdeas.update((list) => [idea, ...list])
      $lastSubmittedIdea.set({
        title: idea.title,
        description: idea.description,
        category: idea.category,
        github: idea.github,
      })
      $submitSuccess.set(true)
      ideaForm.reset()
    })

    if (!result.ok) {
      $submitSuccess.set(false)
    }
  }

  return {
    columns: roadmapColumns,
    communityIdeas: () => $communityIdeas.value(),
    ideaForm,
    ideaFields: { title, description, category, github },
    submitSuccess: () => $submitSuccess.value(),
    lastSubmittedIdea: () => $lastSubmittedIdea.value(),
    submitIdea,
    resetIdeaForm,
    githubIssueUrl: buildGithubIssueUrl,
  }
}, 'RoadmapModel')
