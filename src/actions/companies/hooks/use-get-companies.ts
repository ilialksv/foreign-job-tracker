import { useQuery } from "@tanstack/react-query";

import { companiesRepository } from "@/lib/storage/repositories";

import { companiesQueryKeys } from "../constants/query-keys";

export const useGetCompanies = () =>
  useQuery({
    queryKey: companiesQueryKeys.list(),
    queryFn: () => companiesRepository.list(),
  });
