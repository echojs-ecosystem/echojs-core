import type { QueryClient } from '../types'

type InvalidateArgs = Parameters<QueryClient['invalidateQueries']>

// @ts-expect-error queryKey must be QueryKey (array)
const badStringKey: InvalidateArgs = [{ queryKey: 'users' }]

// @ts-expect-error queryKey must be QueryKey (array)
const badObjectKey: InvalidateArgs = [{ queryKey: { id: '1' } }]

void badStringKey
void badObjectKey
