import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companiesRepository } from "@/lib/storage/repositories";

import { companiesQueryKeys } from "../constants/query-keys";

export const useRemoveCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      companiesRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesQueryKeys.root });
    },
  });
};
