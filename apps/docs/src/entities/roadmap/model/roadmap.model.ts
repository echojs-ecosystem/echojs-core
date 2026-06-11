import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import {
  ideaCategoryOptions,
  roadmapColumns,
  roadmapGithubRepo,
} from '@entities/roadmap/constants/roadmap.data'
import { roadmapIdeaForm } from '@entities/roadmap/model/roadmap-idea.form'
import type {
  CommunityIdea,
  IdeaFormValue,
  RoadmapVM,
} from '@entities/roadmap/types/roadmap.types'

const trim = (value: string): string => value.trim()

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

  const { title, description, category, github } = roadmapIdeaForm.fields

  const resetIdeaForm = (): void => {
    roadmapIdeaForm.reset()
    $submitSuccess.set(false)
    $lastSubmittedIdea.set(null)
  }

  const submitIdea = async (): Promise<void> => {
    const result = await roadmapIdeaForm.submit(async (value) => {
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
      roadmapIdeaForm.reset()
    })

    if (!result.ok) {
      $submitSuccess.set(false)
    }
  }

  return {
    columns: roadmapColumns,
    communityIdeas: () => $communityIdeas.value(),
    ideaForm: roadmapIdeaForm,
    ideaFields: { title, description, category, github },
    submitSuccess: () => $submitSuccess.value(),
    lastSubmittedIdea: () => $lastSubmittedIdea.value(),
    submitIdea,
    resetIdeaForm,
    githubIssueUrl: buildGithubIssueUrl,
  }
}, 'RoadmapModel')
