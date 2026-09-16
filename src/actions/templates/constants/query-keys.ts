export const templatesQueryKeys = {
  root: ["templates"] as const,
  list: () => [...templatesQueryKeys.root, "list"] as const,
};
