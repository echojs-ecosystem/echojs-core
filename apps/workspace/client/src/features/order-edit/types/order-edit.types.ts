import type { OrderEditFields, orderEditForm } from '../model/order-edit.form'

export type OrderEditProps = {
  orderId: string
}

export type OrderEditVM = {
  isLoading: () => boolean
  notFound: () => boolean
  canEdit: () => boolean
  title: () => string
  form: typeof orderEditForm
  fields: OrderEditFields
  tagsInput: () => string
  setTagsInput: (raw: string) => void
  error: () => string | null
  isSaving: () => boolean
  save: () => Promise<void>
  cancel: () => void
}
