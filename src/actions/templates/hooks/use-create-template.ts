import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateInput } from "@/lib/storage/types";
import { templatesRepository } from "@/lib/storage/repositories";
import type { Template } from "@/shared/types/entities";

import { templatesQueryKeys } from "../constants/query-keys";

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Template> }) =>
      templatesRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templatesQueryKeys.root });
    },
  });
};
