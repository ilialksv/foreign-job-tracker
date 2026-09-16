import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companiesRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Company } from "@/shared/types/entities";

import { companiesQueryKeys } from "../constants/query-keys";

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Company> }) =>
      companiesRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesQueryKeys.root });
    },
  });
};
