export const notesQueryKeys = {
  root: ["notes"] as const,
  list: () => [...notesQueryKeys.root, "list"] as const,
};
