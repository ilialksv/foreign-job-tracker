import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateInput } from "@/lib/storage/types";
import { companiesRepository } from "@/lib/storage/repositories";
import type { Company } from "@/shared/types/entities";

import { companiesQueryKeys } from "../constants/query-keys";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Company> }) =>
      companiesRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesQueryKeys.root });
    },
  });
};
