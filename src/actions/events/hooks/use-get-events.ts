import { useQuery } from "@tanstack/react-query";

import { eventsRepository } from "@/lib/storage/repositories";

import { eventsQueryKeys } from "../constants/query-keys";

export const useGetEvents = () =>
  useQuery({
    queryKey: eventsQueryKeys.list(),
    queryFn: () => eventsRepository.list(),
  });
