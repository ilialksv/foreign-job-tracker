import { useMutation, useQueryClient } from "@tanstack/react-query";

import { vacanciesRepository } from "@/lib/storage/repositories";

import { vacanciesQueryKeys } from "../constants/query-keys";

export const useRemoveVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      vacanciesRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vacanciesQueryKeys.root });
    },
  });
};
