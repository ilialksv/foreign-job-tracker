export const contactsQueryKeys = {
  root: ["contacts"] as const,
  list: () => [...contactsQueryKeys.root, "list"] as const,
};
