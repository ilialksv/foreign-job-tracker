import { useMemo } from "react";

import { useGetEvents } from "@/actions/events/hooks/use-get-events";

export const useCompanyTimeline = (params: { companyId: string }) => {
  const eventsQuery = useGetEvents();

  const events = useMemo(
    () =>
      (eventsQuery.data ?? [])
        .filter((event) => event.companyId === params.companyId)
        .sort((left, right) => (left.createdAt < right.createdAt ? 1 : -1)),
    [eventsQuery.data, params.companyId],
  );

  return { events, isLoading: eventsQuery.isLoading };
};
