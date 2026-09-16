import { useMutation, useQueryClient } from "@tanstack/react-query";

import { vacanciesRepository } from "@/lib/storage/repositories";
import type { CreateInput } from "@/lib/storage/types";
import type { Vacancy } from "@/shared/types/entities";

import { vacanciesQueryKeys } from "../constants/query-keys";

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Vacancy> }) =>
      vacanciesRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vacanciesQueryKeys.root });
    },
  });
};
