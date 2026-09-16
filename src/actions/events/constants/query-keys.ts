export const eventsQueryKeys = {
  root: ["events"] as const,
  list: () => [...eventsQueryKeys.root, "list"] as const,
};
