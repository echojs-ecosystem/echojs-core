import type { createField, createForm } from '@echojs-ecosystem/framework/form'

export type RoadmapStatus = 'planned' | 'in-progress' | 'shipped'

export type RoadmapItem = {
  id: string
  title: string
  description: string
  tags?: string[]
}

export type RoadmapColumn = {
  status: RoadmapStatus
  title: string
  description: string
  items: RoadmapItem[]
}

export type IdeaCategory = 'feature' | 'docs' | 'dx' | 'ecosystem'

export type IdeaFormValue = {
  title: string
  description: string
  category: IdeaCategory
  github: string
}

export type IdeaFormFields = {
  title: ReturnType<typeof createField<string>>
  description: ReturnType<typeof createField<string>>
  category: ReturnType<typeof createField<IdeaCategory>>
  github: ReturnType<typeof createField<string>>
}

export type CommunityIdea = IdeaFormValue & {
  id: string
  submittedAt: number
}

export type RoadmapVM = {
  columns: RoadmapColumn[]
  communityIdeas: () => readonly CommunityIdea[]
  ideaForm: ReturnType<typeof createForm<IdeaFormValue, IdeaFormFields>>
  ideaFields: IdeaFormFields
  submitSuccess: () => boolean
  lastSubmittedIdea: () => IdeaFormValue | null
  submitIdea: () => Promise<void>
  resetIdeaForm: () => void
  githubIssueUrl: (idea: IdeaFormValue) => string
}
