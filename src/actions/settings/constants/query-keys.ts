export const settingsQueryKeys = {
  root: ["settings"] as const,
  detail: () => [...settingsQueryKeys.root, "detail"] as const,
};
