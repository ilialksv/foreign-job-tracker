import type { QueryClient } from "@tanstack/react-query";

import { companiesQueryKeys } from "@/actions/companies/constants/query-keys";
import { contactsQueryKeys } from "@/actions/contacts/constants/query-keys";
import { eventsQueryKeys } from "@/actions/events/constants/query-keys";
import { tasksQueryKeys } from "@/actions/tasks/constants/query-keys";
import { vacanciesQueryKeys } from "@/actions/vacancies/constants/query-keys";

export const invalidatePipelineQueries = (params: {
  queryClient: QueryClient;
}) => {
  params.queryClient.invalidateQueries({ queryKey: tasksQueryKeys.root });
  params.queryClient.invalidateQueries({ queryKey: companiesQueryKeys.root });
  params.queryClient.invalidateQueries({ queryKey: contactsQueryKeys.root });
  params.queryClient.invalidateQueries({ queryKey: vacanciesQueryKeys.root });
  params.queryClient.invalidateQueries({ queryKey: eventsQueryKeys.root });
};
