export const tasksQueryKeys = {
  root: ["tasks"] as const,
  list: () => [...tasksQueryKeys.root, "list"] as const,
};
