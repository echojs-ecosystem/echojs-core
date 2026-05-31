export type Updater<TInput, TOutput = TInput> = TOutput | ((input: TInput) => TOutput)

export const functionalUpdate = <TInput, TOutput = TInput>(
  updater: Updater<TInput, TOutput>,
  input: TInput,
): TOutput =>
  typeof updater === 'function'
    ? (updater as (value: TInput) => TOutput)(input)
    : updater
