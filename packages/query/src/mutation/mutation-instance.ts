import { Mutation } from '../core/mutation'
import type {
  MutationDefinition,
  MutationInstance,
  QueryClient,
} from '../types'

export const createMutationInstance = <
  TData,
  TVariables,
  TError = unknown,
  TRollback = unknown,
>(
  definition: MutationDefinition<TData, TVariables, TError, TRollback>,
  client: QueryClient,
): MutationInstance<TData, TVariables, TError> => {
  const mutation = new Mutation(definition, client, client.mutationCache)
  return mutation.toInstance()
}
