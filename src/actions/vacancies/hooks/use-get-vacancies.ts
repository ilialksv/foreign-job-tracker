import { useQuery } from "@tanstack/react-query";

import { vacanciesRepository } from "@/lib/storage/repositories";

import { vacanciesQueryKeys } from "../constants/query-keys";

export const useGetVacancies = () =>
  useQuery({
    queryKey: vacanciesQueryKeys.list(),
    queryFn: () => vacanciesRepository.list(),
  });
