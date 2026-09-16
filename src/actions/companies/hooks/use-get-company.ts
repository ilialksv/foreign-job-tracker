import { useQuery } from "@tanstack/react-query";

import { companiesRepository } from "@/lib/storage/repositories";

import { companiesQueryKeys } from "../constants/query-keys";

export const useGetCompany = (params: { id: string }) =>
  useQuery({
    queryKey: companiesQueryKeys.detail({ id: params.id }),
    queryFn: () => companiesRepository.getById({ id: params.id }),
  });
