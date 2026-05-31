import { getDefaultQueryClient } from '../client/default-client'
import type { CreateQueryMeta } from '../query/create-query'
import { getQueryProvider } from '../provider/context'
import type {
  MutationDefinition,
  MutationInstance,
  MutationOptions,
  QueryClient,
} from '../types'
import { createMutationInstance } from './mutation-instance'

export const createMutation = <
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
>(
  options: MutationOptions<TData, TVariables, TError, TRollback>,
  meta?: CreateQueryMeta,
): MutationDefinition<TData, TVariables, TError, TRollback> => {
  const provider = meta?.provider ?? getQueryProvider()
  const mergedOptions: MutationOptions<TData, TVariables, TError, TRollback> = {
    ...(provider?.config.defaultOptions?.mutations as
      | Partial<MutationOptions<TData, TVariables, TError, TRollback>>
      | undefined),
    ...options,
  }

  return {
    kind: 'mutation-definition',
    name: mergedOptions.name,
    options: mergedOptions,
    create(opts?: { client?: QueryClient }): MutationInstance<TData, TVariables, TError> {
      const client =
        opts?.client ?? provider?.client ?? getDefaultQueryClient()
      return createMutationInstance(
        {
          kind: 'mutation-definition',
          name: mergedOptions.name,
          options: mergedOptions,
          create: this.create,
        },
        client,
      )
    },
  }
}
