import { useMutation, useQueryClient } from "@tanstack/react-query";

import { vacanciesRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Vacancy } from "@/shared/types/entities";

import { vacanciesQueryKeys } from "../constants/query-keys";

export const useUpdateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Vacancy> }) =>
      vacanciesRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vacanciesQueryKeys.root });
    },
  });
};
