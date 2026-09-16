export const companiesQueryKeys = {
  root: ["companies"] as const,
  list: () => [...companiesQueryKeys.root, "list"] as const,
  detail: (params: { id: string }) =>
    [...companiesQueryKeys.root, "detail", params.id] as const,
};
