export const queryDefaults = {
  keepPreviousData: true,
  staleTime: 60000,
} as const;
export const mutationDefaults = {
  retry: false,
} as const;