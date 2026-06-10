import type { MaybePromise } from './maybe-promise'

export type AsyncTask<T> = MaybePromise<T> | (() => MaybePromise<T>)
