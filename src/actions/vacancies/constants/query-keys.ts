export const vacanciesQueryKeys = {
  root: ["vacancies"] as const,
  list: () => [...vacanciesQueryKeys.root, "list"] as const,
};
