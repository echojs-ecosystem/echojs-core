/** Known structured model sections. */
export type ModelSection = 'state' | 'data' | 'functions' | 'form' | 'permission'

export type ModelSectionRecord = Record<string, unknown>

/** Recommended shape when `structExports: true`. */
export type StructuredModelShape = {
  state?: ModelSectionRecord
  data?: ModelSectionRecord
  functions?: ModelSectionRecord
  form?: ModelSectionRecord
  permission?: ModelSectionRecord
}

export type CreateModelOptions =
  | {
      name: string
      /** Flat factory return (default). */
      structExports?: false
    }
  | {
      name: string
      /**
       * Hints that the factory returns structured sections (`state`, `data`, `functions`, …).
       * Return type is still inferred from the factory — use {@link StructuredModelShape} as a guide.
       */
      structExports: true
    }

export type ModelFactoryFn<VM> = () => VM

export type ModelFactory<VM> = ModelFactoryFn<VM> & { readonly displayName: string }
